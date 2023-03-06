import { z } from 'zod';
import { RunWhereInputObjectSchema } from './RunWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunListRelationFilter> = z
  .object({
    every: z.lazy(() => RunWhereInputObjectSchema).optional(),
    some: z.lazy(() => RunWhereInputObjectSchema).optional(),
    none: z.lazy(() => RunWhereInputObjectSchema).optional(),
  })
  .strict();

export const RunListRelationFilterObjectSchema = Schema;
