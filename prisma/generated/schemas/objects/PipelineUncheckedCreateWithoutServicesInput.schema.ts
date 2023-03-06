import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineUncheckedCreateWithoutServicesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string().optional().nullable(),
    githubPat: z.string(),
    awsAccessKey: z.string(),
    awsSecretAccessKey: z.string(),
  })
  .strict();

export const PipelineUncheckedCreateWithoutServicesInputObjectSchema = Schema;
