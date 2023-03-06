import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { EnvironmentVariableCountOrderByAggregateInputObjectSchema } from './EnvironmentVariableCountOrderByAggregateInput.schema';
import { EnvironmentVariableMaxOrderByAggregateInputObjectSchema } from './EnvironmentVariableMaxOrderByAggregateInput.schema';
import { EnvironmentVariableMinOrderByAggregateInputObjectSchema } from './EnvironmentVariableMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnvironmentVariableOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      resourceId: z.lazy(() => SortOrderSchema).optional(),
      resourceType: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      value: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => EnvironmentVariableCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => EnvironmentVariableMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => EnvironmentVariableMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();

export const EnvironmentVariableOrderByWithAggregationInputObjectSchema =
  Schema;
