import { z } from 'zod';
import { TriggerTypeSchema } from '../enums/TriggerType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumTriggerTypeFilter> = z
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
        z.lazy(() => NestedEnumTriggerTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumTriggerTypeFilterObjectSchema = Schema;
