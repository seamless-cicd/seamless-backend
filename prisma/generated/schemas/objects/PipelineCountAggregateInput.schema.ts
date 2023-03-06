import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    name: z.literal(true).optional(),
    githubPat: z.literal(true).optional(),
    awsAccessKey: z.literal(true).optional(),
    awsSecretAccessKey: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const PipelineCountAggregateInputObjectSchema = Schema;
