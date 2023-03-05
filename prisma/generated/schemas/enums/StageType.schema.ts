import { z } from 'zod';

export const StageTypeSchema = z.enum([
  'PREPARE',
  'CODE_QUALITY',
  'UNIT_TEST',
  'BUILD',
  'INTEGRATION_TEST',
  'DEPLOY_STAGING',
  'DEPLOY_PROD',
  'OTHER',
]);
