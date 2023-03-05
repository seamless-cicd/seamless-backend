import { z } from 'zod';
import { StageTypeSchema } from '../enums/StageType.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStageTypeFilterObjectSchema } from './NestedEnumStageTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumStageTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => StageTypeSchema).optional(),
    in: z
      .lazy(() => StageTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => StageTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => StageTypeSchema),
        z.lazy(() => NestedEnumStageTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumStageTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumStageTypeFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumStageTypeWithAggregatesFilterObjectSchema = Schema;
