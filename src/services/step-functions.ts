import {
  ListStateMachinesCommand,
  SendTaskSuccessCommand,
  SFNClient,
  StartExecutionCommand,
} from '@aws-sdk/client-sfn';
import { StageType, Status, TriggerType } from '@prisma/client';
import { z } from 'zod';
import { SfnInputSchema, Stage } from '../schemas/step-function-schema';
import { AWS_ACCOUNT_ID, AWS_REGION } from '../utils/config';
import pipelinesService from './pipelines';
import runsService from './runs';
import servicesService from './services';
import stagesService from './stages';

const stageEnumToId = {
  [StageType.PREPARE]: 'prepare',
  [StageType.CODE_QUALITY]: 'codeQuality',
  [StageType.UNIT_TEST]: 'unitTest',
  [StageType.BUILD]: 'build',
  [StageType.INTEGRATION_TEST]: 'integrationTest',
  [StageType.DEPLOY_STAGING]: 'deployStaging',
  [StageType.DEPLOY_PROD]: 'deployProduction',
  [StageType.OTHER]: 'deployProduction',
};

// Assumes a new Run and associated Stage have already been created
async function gatherInput(runId: string) {
  try {
    // Query db for all associated entities
    const run = await runsService.getOne(runId);
    if (!run || !run?.serviceId) throw new Error('failed to get run data');

    const stages = await stagesService.getAllForRun(runId);
    if (!stages) throw new Error('failed to get stages associated with run');

    const service = await servicesService.getOne(run.serviceId);
    if (!service || !service?.pipelineId)
      throw new Error('failed to get service associated with run');

    const pipeline = await pipelinesService.getOne(service.pipelineId);
    if (!pipeline)
      throw new Error('failed to get pipeline associated with service');

    // Assemble the Step Function input object
    const stageIds: Record<string, string> = {};
    const runStatusStages: Record<string, Stage> = {};

    stages.forEach((stage) => {
      const stageType = stage.type;
      const stageFieldName = stageEnumToId[stageType];
      stageIds[stageFieldName] = stage.id;
      runStatusStages[stageFieldName] = {
        id: stage.id,
        status: Status.IDLE,
      };
    });

    const sfnInput = {
      serviceId: service.id,
      runId: run.id,
      stageIds: stageIds,
      runStatus: {
        run: {
          id: run.id,
          status: Status.IDLE,
        },
        stages: runStatusStages,
      },
      runFull: run.triggerType === TriggerType.MAIN,
      useStaging: service.useStaging,
      autoDeploy: service.autoDeploy,
      containerVariables: {
        awsRegion: AWS_REGION,
        awsAccountId: AWS_ACCOUNT_ID,
        githubClientId: pipeline.githubClientId,
        githubClientSecret: pipeline.githubClientSecret,
        githubOauthToken: pipeline.githubOauthToken,
        githubRepoUrl: service.githubRepoUrl,
        commitHash: run.commitHash,
        codeQualityCommand: service.codeQualityCommand,
        unitTestCommand: service.unitTestCommand,
        dockerfilePath: service.dockerfilePath,
        awsEcsClusterStaging: pipeline.awsEcsClusterStaging,
        awsEcsServiceStaging: service.awsEcsServiceStaging,
        awsEcsCluster: pipeline.awsEcsCluster,
        awsEcsService: service.awsEcsService,
      },
    };

    // Validate data
    const validatedSfnInput = SfnInputSchema.parse(sfnInput);
    return validatedSfnInput;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
    } else {
      console.error('failed to get step function input data');
    }
    return null;
  }
}

async function start(runId: string) {
  try {
    const sfnInput = await gatherInput(runId);
    if (!sfnInput) throw new Error('failed to get step function input data');

    const sfnClient = new SFNClient({
      region: AWS_REGION,
    });

    const sfnCommand = new StartExecutionCommand({
      stateMachineArn: await retrieveStepFunctionArn(sfnClient),
      input: JSON.stringify(sfnInput),
    });

    const response = await sfnClient.send(sfnCommand);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        error.message || 'failed to start step function; check input data',
      );
    }
  }
}

export async function sendTaskToken(taskToken: string) {
  const sfnClient = new SFNClient({
    region: AWS_REGION,
  });

  const sfnCommand = new SendTaskSuccessCommand({
    taskToken,
    output: '{}',
  });

  const response = await sfnClient.send(sfnCommand);
  return response;
}

// Retrieve a step function's ARN
async function retrieveStepFunctionArn(sfnClient: SFNClient) {
  const { stateMachines } = await sfnClient.send(
    new ListStateMachinesCommand({}),
  );

  if (!stateMachines || stateMachines.length === 0) {
    throw new Error('failed to get step function arn');
  }

  const stateMachineArn = stateMachines
    .filter((stateMachine) =>
      /^SeamlessStateMachine/.test(stateMachine.name || ''),
    )
    .map((stateMachine) => stateMachine.stateMachineArn)[0];

  return stateMachineArn;
}

export default { gatherInput, start };
