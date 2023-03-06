import { z } from 'zod';
import { ServiceUncheckedCreateNestedManyWithoutPipelineInputObjectSchema } from './ServiceUncheckedCreateNestedManyWithoutPipelineInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string().optional().nullable(),
    githubPat: z.string(),
    awsAccessKey: z.string(),
    awsSecretAccessKey: z.string(),
    services: z
      .lazy(
        () => ServiceUncheckedCreateNestedManyWithoutPipelineInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const PipelineUncheckedCreateInputObjectSchema = Schema;
