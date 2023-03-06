import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { StageCountOrderByAggregateInputObjectSchema } from './StageCountOrderByAggregateInput.schema';
import { StageAvgOrderByAggregateInputObjectSchema } from './StageAvgOrderByAggregateInput.schema';
import { StageMaxOrderByAggregateInputObjectSchema } from './StageMaxOrderByAggregateInput.schema';
import { StageMinOrderByAggregateInputObjectSchema } from './StageMinOrderByAggregateInput.schema';
import { StageSumOrderByAggregateInputObjectSchema } from './StageSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endedAt: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    runId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => StageCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => StageAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => StageMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => StageMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => StageSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const StageOrderByWithAggregationInputObjectSchema = Schema;
