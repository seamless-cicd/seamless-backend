import { z } from 'zod';

export const PipelineScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'name',
  'githubPat',
  'awsAccessKey',
  'awsSecretAccessKey',
]);
