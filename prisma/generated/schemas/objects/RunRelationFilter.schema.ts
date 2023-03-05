import { z } from 'zod';
import { RunWhereInputObjectSchema } from './RunWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunRelationFilter> = z
  .object({
    is: z
      .lazy(() => RunWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => RunWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const RunRelationFilterObjectSchema = Schema;
