import { z } from 'zod';
import { PipelineWhereInputObjectSchema } from './PipelineWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineRelationFilter> = z
  .object({
    is: z
      .lazy(() => PipelineWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => PipelineWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PipelineRelationFilterObjectSchema = Schema;
