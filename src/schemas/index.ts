import { z } from 'zod';

export const statusEnum = z.enum(['SUCCESS', 'FAILURE', 'IN_PROGRESS', 'IDLE']);

const statusObject = z.object({
  id: z.string(),
  status: statusEnum,
});

export const pipelineStatusUpdateSchema = z.object({
  run: statusObject,
  stages: z.object({
    prepare: statusObject,
    codeQuality: statusObject,
    unitTest: statusObject,
    build: statusObject,
    deployProduction: statusObject,
  }),
});
