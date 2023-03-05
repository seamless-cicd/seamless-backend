import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnvironmentVariableMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    resourceId: z.literal(true).optional(),
    resourceType: z.literal(true).optional(),
    name: z.literal(true).optional(),
    value: z.literal(true).optional(),
  })
  .strict();

export const EnvironmentVariableMaxAggregateInputObjectSchema = Schema;
