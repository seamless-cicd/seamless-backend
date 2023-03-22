import { Status } from '@prisma/client';
import { z } from 'zod';

const StageIdsSchema = z.object({
  prepare: z.string().uuid(),
  codeQuality: z.string().uuid(),
  unitTest: z.string().uuid(),
  build: z.string().uuid(),
  integrationTest: z.string().uuid().optional(),
  deployStaging: z.string().uuid().optional(),
  deployProduction: z.string().uuid(),
});

type StageIds = z.infer<typeof StageIdsSchema>;

const StatusSchema = z.enum([
  Status.SUCCESS,
  Status.FAILURE,
  Status.IN_PROGRESS,
  Status.IDLE,
  Status.AWAITING_APPROVAL,
]);

const StageSchema = z.object({
  id: z.string(),
  status: StatusSchema,
});

type Stage = z.infer<typeof StageSchema>;

const RunStatusSchema = z.object({
  run: StageSchema,
  stages: z.object({
    prepare: StageSchema,
    codeQuality: StageSchema,
    unitTest: StageSchema,
    build: StageSchema,
    integrationTest: StageSchema.optional(),
    deployStaging: StageSchema.optional(),
    deployProduction: StageSchema,
  }),
});

type RunStatus = z.infer<typeof RunStatusSchema>;

// Corresponds to State Machine Stack input in the infrastructure
const ContainerVariablesSchema = z.object({
  awsRegion: z.string(),
  awsAccountId: z.string(),
  githubClientId: z.string(),
  githubClientSecret: z.string(),
  githubOauthToken: z.string(),
  githubRepoUrl: z.string(),
  commitHash: z.string(),
  codeQualityCommand: z.string(),
  unitTestCommand: z.string(),
  dockerfilePath: z.string(),
  // Integration testing is optional
  githubIntegrationTestRepoUrl: z.string().optional(),
  dockerComposeFilePath: z.string().optional(),
  dockerComposeServiceName: z.string().optional(),
  dockerComposeIntegrationTestServiceName: z.string().optional(),
  // Staging environment is optional
  awsEcsClusterStaging: z.string().optional(),
  awsEcsServiceStaging: z.string().optional(),
  awsEcsCluster: z.string(),
  awsEcsService: z.string(),
});

type ContainerVariables = z.infer<typeof ContainerVariablesSchema>;

// Schema for validating the input data required for the Step Function to run
const SfnInputSchema = z.object({
  serviceId: z.string().uuid(),
  runId: z.string().uuid(),
  stageIds: StageIdsSchema,
  runStatus: RunStatusSchema,
  runFull: z.boolean(),
  useStaging: z.boolean(),
  autoDeploy: z.boolean(),
  runIntegrationTest: z.boolean(),
  containerVariables: ContainerVariablesSchema,
});

type SfnInput = z.infer<typeof SfnInputSchema>;

export {
  SfnInputSchema,
  SfnInput,
  StageIds,
  Stage,
  RunStatus,
  ContainerVariables,
  RunStatusSchema,
};
