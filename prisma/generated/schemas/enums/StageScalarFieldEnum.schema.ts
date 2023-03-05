import { z } from 'zod';

export const StageScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'type',
  'startedAt',
  'endedAt',
  'duration',
  'status',
  'runId',
]);
