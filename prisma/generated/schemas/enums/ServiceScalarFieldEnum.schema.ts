import { z } from 'zod';

export const ServiceScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'name',
  'lastRunAt',
  'triggerOnMain',
  'triggerOnPrOpen',
  'triggerOnPrSync',
  'useStaging',
  'autoDeploy',
  'githubRepoUrl',
  'unitTestCommand',
  'integrationTestCommand',
  'codeQualityCommand',
  'dockerfilePath',
  'dockerComposeFilePath',
  'pipelineId',
]);
