import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    type: z.literal(true).optional(),
    startedAt: z.literal(true).optional(),
    endedAt: z.literal(true).optional(),
    duration: z.literal(true).optional(),
    status: z.literal(true).optional(),
    runId: z.literal(true).optional(),
  })
  .strict();

export const StageMaxAggregateInputObjectSchema = Schema;
