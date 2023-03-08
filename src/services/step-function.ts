import {
  SfnInputSchema,
  SfnInput,
  Stage,
  StageIds,
} from '../clients/step-function/input-schema';
import { StageType, Status } from '@prisma/client';
import { StartExecutionCommand } from '@aws-sdk/client-sfn';
import { createSfnClient } from '../clients/step-function';
import servicesService from './services';
import runsService from './runs';
import stagesService from './stages';
import pipelinesService from './pipelines';

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
async function gatherInput(
  runId: string,
  runFull = true,
  autoDeploy = false,
): Promise<SfnInput> {
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
    const runDataStages: Record<string, Stage> = {};

    stages.forEach((stage) => {
      const stageType = stage.type;
      const stageFieldName = stageEnumToId[stageType];
      stageIds[stageFieldName] = stage.id;
      runDataStages[stageFieldName] = {
        id: stage.id,
        type: stageType,
        status: Status.IDLE,
      };
    });

    const sfnInput = {
      serviceId: service.id,
      runId: run.id,
      stageIds,
      runData: {
        status: 'IDLE',
        commitHash: run.commitHash,
        commitMessage: run.commitMessage,
        committer: run.committer,
        triggerType: run.triggerType,
        ...runDataStages,
      },
      runFull,
      autoDeploy,
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
        awsEcsCluster: pipeline.awsEcsCluster,
        awsEcsService: pipeline.awsEcsService,
        awsEcrRepo: pipeline.awsEcsRepo,
        logSubscriberUrl: 'https://abc123.m.pipedream.net',
      },
    };

    // Validate data shape
    if (!SfnInputSchema.safeParse(sfnInput).success) {
      throw new Error('Invalid input data');
    }

    return sfnInput;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Failed to retrieve Step Function input data',
      );
    }
  }
}

async function start(stateMachineArn: string, serviceId: string) {
  try {
    const sfnInput = await gatherInput(serviceId);

    const { awsRegion, awsAccessKey, awsSecretAccessKey } =
      sfnInput.containerVariables;
    const sfnClient = createSfnClient(
      awsRegion,
      awsAccessKey,
      awsSecretAccessKey,
    );

    const sfnCommand = new StartExecutionCommand({
      stateMachineArn,
      input: JSON.stringify(sfnInput),
    });

    const response = await sfnClient.send(sfnCommand);

    // Update RDS
    // Notify user of state machine start
  } catch (error) {
    console.error('Failed to start Step Function. Check input data.');
  }
}

export { start };
