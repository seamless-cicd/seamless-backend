import { z } from 'zod';

// Service Setup Form
export const serviceFormSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(40),
  triggerOnMain: z.boolean().default(false),
  triggerOnPrOpen: z.boolean().default(false),
  triggerOnPrSync: z.boolean().default(false),
  useStaging: z.boolean().default(false),
  autoDeploy: z.boolean().default(false),
  githubRepoUrl: z.string().min(1, 'GitHub repo is required'),
  unitTestCommand: z.string().min(1, 'Unit test command is required'),
  integrationTestCommand: z
    .string()
    .min(1, 'Integration test command is required'),
  codeQualityCommand: z.string().min(1, 'Code quality command is required'),
  dockerfilePath: z.string().min(1, 'Dockerfile path is required'),
  dockerComposeFilePath: z
    .string()
    .min(1, 'Docker compose file path is required'),
  awsEcsService: z.string().min(1, 'AWS ECS Service is required'),
  // pipeline id is added programmatically in submit handler
  pipelineId: z.string().optional(),
});

export type ServiceFormType = z.infer<typeof serviceFormSchema>;

// Service Edit Form
export const serviceEditFormSchema = serviceFormSchema.deepPartial();
export type ServiceEditFormType = z.infer<typeof serviceEditFormSchema>;
