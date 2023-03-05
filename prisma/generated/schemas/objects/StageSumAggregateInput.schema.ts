import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageSumAggregateInputType> = z
  .object({
    duration: z.literal(true).optional(),
  })
  .strict();

export const StageSumAggregateInputObjectSchema = Schema;
