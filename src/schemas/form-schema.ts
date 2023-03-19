// These are also used on the Frontend
import { z } from 'zod';

// Pipeline Setup Form
export const pipelineFormSchema = z.object({
  name: z.string().min(1, 'Pipeline name is required').max(40),
  awsEcsCluster: z.string().min(1, 'ECS Cluster name is required').max(40),
  awsEcsClusterStaging: z.string().optional(),
});

export type PipelineFormType = z.infer<typeof pipelineFormSchema>;

// Service Edit Form
export const serviceEditFormSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(40),
  triggerOnMain: z.boolean().default(true),
  triggerOnPrOpen: z.boolean().default(false),
  triggerOnPrSync: z.boolean().default(false),
  useStaging: z.boolean().default(false),
  autoDeploy: z.boolean().default(false),
  githubRepoUrl: z.string().min(1, 'GitHub repo is required'),
  unitTestCommand: z.string().min(1, 'Unit test command is required'),
  integrationTestCommand: z.string().optional(),
  codeQualityCommand: z.string().min(1, 'Code quality command is required'),
  dockerfilePath: z.string().min(1, 'Dockerfile path is required'),
  dockerComposeFilePath: z.string().optional(),
  awsEcrRepo: z.string().min(1, 'AWS ECR repo is required'),
  awsEcsService: z.string().min(1, 'AWS ECS Service is required'),
  awsEcsServiceStaging: z.string().optional(),
});

export type ServiceEditFormType = z.infer<typeof serviceEditFormSchema>;

// Service Setup Form
// Pipeline id is added programmatically in submit handler
export const serviceFormSchema = serviceEditFormSchema.extend({
  pipelineId: z.string().optional(),
});

export type ServiceFormType = z.infer<typeof serviceFormSchema>;
