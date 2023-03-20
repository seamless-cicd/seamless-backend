import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';
import { StageType, Status, TriggerType } from '@prisma/client';
import { z } from 'zod';
import { SfnInputSchema, Stage } from '../schemas/step-function-schema';
import { AWS_ACCOUNT_ID, AWS_REGION, STEP_FUNCTION_ARN } from '../utils/config';
import prisma from '../utils/prisma-client';

const stageEnumToId = {
  [StageType.PREPARE]: 'prepare',
  [StageType.CODE_QUALITY]: 'codeQuality',
  [StageType.UNIT_TEST]: 'unitTest',
  [StageType.BUILD]: 'build',
  [StageType.INTEGRATION_TEST]: 'integrationTest',
  [StageType.DEPLOY_STAGING]: 'deployStaging',
  [StageType.DEPLOY_PROD]: 'deployProduction',
  [StageType.OTHER]: 'other',
};

// Gather data required for Step Function to run
async function gatherInput(runId: string) {
  try {
    // Query db for all entities associated with the run
    const data = await prisma.run.findUnique({
      where: { id: runId },
      include: {
        stages: true,
        Service: {
          include: {
            Pipeline: true,
          },
        },
      },
    });

    // Split data into entities
    const pipeline = data?.Service?.Pipeline;
    const service = data?.Service
      ? { ...data.Service, Pipeline: undefined }
      : undefined;
    const stages = data?.stages;
    const run = { ...data, Service: undefined, stages: undefined };

    if (!pipeline || !service || !run || !stages) {
      throw new Error('failed to get step function input data');
    }

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

// Start Step Function
async function start(runId: string) {
  try {
    const sfnInput = await gatherInput(runId);
    if (!sfnInput) throw new Error('failed to get step function input data');

    const sfnClient = new SFNClient({
      region: AWS_REGION,
    });

    const sfnCommand = new StartExecutionCommand({
      stateMachineArn: STEP_FUNCTION_ARN,
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

export default { gatherInput, start };
