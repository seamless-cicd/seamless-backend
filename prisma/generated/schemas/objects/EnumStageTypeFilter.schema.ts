import { z } from 'zod';
import { StageTypeSchema } from '../enums/StageType.schema';
import { NestedEnumStageTypeFilterObjectSchema } from './NestedEnumStageTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStageTypeFilter> = z
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
        z.lazy(() => NestedEnumStageTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumStageTypeFilterObjectSchema = Schema;
