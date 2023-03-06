import { z } from 'zod';
import { ResourceTypeSchema } from '../enums/ResourceType.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumResourceTypeFilterObjectSchema } from './NestedEnumResourceTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumResourceTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => ResourceTypeSchema).optional(),
    in: z
      .lazy(() => ResourceTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => ResourceTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => ResourceTypeSchema),
        z.lazy(() => NestedEnumResourceTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumResourceTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumResourceTypeFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumResourceTypeWithAggregatesFilterObjectSchema = Schema;
