import { z } from 'zod';

export const RunScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'startedAt',
  'endedAt',
  'duration',
  'commitHash',
  'commitMessage',
  'committer',
  'status',
  'triggerType',
  'serviceId',
]);
