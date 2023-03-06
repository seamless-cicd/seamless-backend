import { z } from 'zod';
import { ResourceTypeSchema } from '../enums/ResourceType.schema';
import { NestedEnumResourceTypeFilterObjectSchema } from './NestedEnumResourceTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumResourceTypeFilter> = z
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
        z.lazy(() => NestedEnumResourceTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumResourceTypeFilterObjectSchema = Schema;
