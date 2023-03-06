import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PipelineCountOrderByAggregateInputObjectSchema } from './PipelineCountOrderByAggregateInput.schema';
import { PipelineMaxOrderByAggregateInputObjectSchema } from './PipelineMaxOrderByAggregateInput.schema';
import { PipelineMinOrderByAggregateInputObjectSchema } from './PipelineMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    githubPat: z.lazy(() => SortOrderSchema).optional(),
    awsAccessKey: z.lazy(() => SortOrderSchema).optional(),
    awsSecretAccessKey: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => PipelineCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => PipelineMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => PipelineMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const PipelineOrderByWithAggregationInputObjectSchema = Schema;
