import { z } from 'zod';
import { TriggerTypeSchema } from '../enums/TriggerType.schema';
import { NestedEnumTriggerTypeWithAggregatesFilterObjectSchema } from './NestedEnumTriggerTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumTriggerTypeFilterObjectSchema } from './NestedEnumTriggerTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumTriggerTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => TriggerTypeSchema).optional(),
    in: z
      .lazy(() => TriggerTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TriggerTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => TriggerTypeSchema),
        z.lazy(() => NestedEnumTriggerTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumTriggerTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumTriggerTypeFilterObjectSchema).optional(),
  })
  .strict();

export const EnumTriggerTypeWithAggregatesFilterObjectSchema = Schema;
