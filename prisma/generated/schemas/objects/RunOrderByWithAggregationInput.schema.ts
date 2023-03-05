import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RunCountOrderByAggregateInputObjectSchema } from './RunCountOrderByAggregateInput.schema';
import { RunAvgOrderByAggregateInputObjectSchema } from './RunAvgOrderByAggregateInput.schema';
import { RunMaxOrderByAggregateInputObjectSchema } from './RunMaxOrderByAggregateInput.schema';
import { RunMinOrderByAggregateInputObjectSchema } from './RunMinOrderByAggregateInput.schema';
import { RunSumOrderByAggregateInputObjectSchema } from './RunSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endedAt: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    commitHash: z.lazy(() => SortOrderSchema).optional(),
    commitMessage: z.lazy(() => SortOrderSchema).optional(),
    committer: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    triggerType: z.lazy(() => SortOrderSchema).optional(),
    serviceId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => RunCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => RunAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => RunMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => RunMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => RunSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const RunOrderByWithAggregationInputObjectSchema = Schema;
