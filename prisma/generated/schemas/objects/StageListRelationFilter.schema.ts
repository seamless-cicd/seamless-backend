import { z } from 'zod';
import { StageWhereInputObjectSchema } from './StageWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageListRelationFilter> = z
  .object({
    every: z.lazy(() => StageWhereInputObjectSchema).optional(),
    some: z.lazy(() => StageWhereInputObjectSchema).optional(),
    none: z.lazy(() => StageWhereInputObjectSchema).optional(),
  })
  .strict();

export const StageListRelationFilterObjectSchema = Schema;
