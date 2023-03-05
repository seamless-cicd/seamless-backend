import { z } from 'zod';
import { ServiceCreateNestedManyWithoutPipelineInputObjectSchema } from './ServiceCreateNestedManyWithoutPipelineInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string().optional().nullable(),
    githubPat: z.string(),
    awsAccessKey: z.string(),
    awsSecretAccessKey: z.string(),
    services: z
      .lazy(() => ServiceCreateNestedManyWithoutPipelineInputObjectSchema)
      .optional(),
  })
  .strict();

export const PipelineCreateInputObjectSchema = Schema;
