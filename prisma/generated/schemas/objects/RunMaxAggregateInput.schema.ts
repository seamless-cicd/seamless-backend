import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    startedAt: z.literal(true).optional(),
    endedAt: z.literal(true).optional(),
    duration: z.literal(true).optional(),
    commitHash: z.literal(true).optional(),
    commitMessage: z.literal(true).optional(),
    committer: z.literal(true).optional(),
    status: z.literal(true).optional(),
    triggerType: z.literal(true).optional(),
    serviceId: z.literal(true).optional(),
  })
  .strict();

export const RunMaxAggregateInputObjectSchema = Schema;
