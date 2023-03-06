import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageAvgOrderByAggregateInput> = z
  .object({
    duration: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const StageAvgOrderByAggregateInputObjectSchema = Schema;
