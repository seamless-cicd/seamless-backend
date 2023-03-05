import { z } from 'zod';
import { StatusSchema } from '../enums/Status.schema';
import { NestedEnumStatusWithAggregatesFilterObjectSchema } from './NestedEnumStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStatusFilterObjectSchema } from './NestedEnumStatusFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => StatusSchema).optional(),
    in: z
      .lazy(() => StatusSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StatusSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StatusSchema),
        z.lazy(() => NestedEnumStatusWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumStatusFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumStatusFilterObjectSchema).optional(),
  })
  .strict();

export const EnumStatusWithAggregatesFilterObjectSchema = Schema;
