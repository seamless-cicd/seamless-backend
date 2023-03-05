import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    name: z.literal(true).optional(),
    lastRunAt: z.literal(true).optional(),
    triggerOnMain: z.literal(true).optional(),
    triggerOnPrOpen: z.literal(true).optional(),
    triggerOnPrSync: z.literal(true).optional(),
    useStaging: z.literal(true).optional(),
    autoDeploy: z.literal(true).optional(),
    githubRepoUrl: z.literal(true).optional(),
    unitTestCommand: z.literal(true).optional(),
    integrationTestCommand: z.literal(true).optional(),
    codeQualityCommand: z.literal(true).optional(),
    dockerfilePath: z.literal(true).optional(),
    dockerComposeFilePath: z.literal(true).optional(),
    pipelineId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ServiceCountAggregateInputObjectSchema = Schema;
