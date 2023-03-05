import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    githubPat: z.lazy(() => SortOrderSchema).optional(),
    awsAccessKey: z.lazy(() => SortOrderSchema).optional(),
    awsSecretAccessKey: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const PipelineMinOrderByAggregateInputObjectSchema = Schema;
