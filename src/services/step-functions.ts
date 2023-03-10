import { StartExecutionCommand } from '@aws-sdk/client-sfn';
import { StageType, Status } from '@prisma/client';
import { z } from 'zod';
import { createSfnClient } from '../clients/step-function';
import { SfnInputSchema, Stage } from '../schemas/step-functions-schema';
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
    if (!run || !run?.serviceId) throw new Error('Failed to get Run data');

    const stages = await stagesService.getAllForRun(runId);
    if (!stages) throw new Error('Failed to get Stages associated with Run');

    const service = await servicesService.getOne(run.serviceId);
    if (!service || !service?.pipelineId)
      throw new Error('Failed to get Service associated with Run');

    const pipeline = await pipelinesService.getOne(service.pipelineId);
    if (!pipeline)
      throw new Error('Failed to get Pipeline associated with Service');

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
      awsStepFunction: pipeline.awsStepFunction,
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
      runFull: service.triggerOnMain,
      useStaging: service.useStaging,
      autoDeploy: service.autoDeploy,
      containerVariables: {
        awsRegion: pipeline.awsRegion,
        awsAccountId: pipeline.awsAccountId,
        awsAccessKey: pipeline.awsAccessKey,
        awsSecretAccessKey: pipeline.awsSecretAccessKey,
        githubPat: pipeline.githubPat,
        githubRepoUrl: service.githubRepoUrl,
        codeQualityCommand: service.codeQualityCommand,
        unitTestCommand: service.unitTestCommand,
        dockerfilePath: service.dockerfilePath,
        awsEcsClusterStaging: pipeline.awsEcsClusterStaging,
        awsEcsServiceStaging: service.awsEcsServiceStaging,
        awsEcsCluster: pipeline.awsEcsCluster,
        awsEcsService: service.awsEcsService,
        awsEcrRepo: service.awsEcrRepository,
        logSubscriberUrl: service.logSubscriberUrl,
      },
    };

    // Validate data shape
    const validatedSfnInput = SfnInputSchema.parse(sfnInput);

    return validatedSfnInput;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
    } else {
      console.error('Failed to retrieve Step Function input data');
    }
    return null;
  }
}

async function start(runId: string) {
  try {
    const sfnInput = await gatherInput(runId);
    if (!sfnInput)
      throw new Error('Failed to retrieve Step Function input data');

    const { awsRegion, awsAccessKey, awsSecretAccessKey } =
      sfnInput.containerVariables;
    const sfnClient = createSfnClient(
      awsRegion,
      awsAccessKey,
      awsSecretAccessKey,
    );

    const sfnCommand = new StartExecutionCommand({
      stateMachineArn: sfnInput.awsStepFunction,
      input: JSON.stringify(sfnInput),
    });

    const response = await sfnClient.send(sfnCommand);

    // Call other services to write to RDS and send notifications

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        error.message || 'Failed to start Step Function. Check input data.',
      );
    }
  }
}

export default { gatherInput, start };
