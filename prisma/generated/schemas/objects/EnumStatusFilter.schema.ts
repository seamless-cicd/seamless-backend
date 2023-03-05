import { z } from 'zod';
import { StatusSchema } from '../enums/Status.schema';
import { NestedEnumStatusFilterObjectSchema } from './NestedEnumStatusFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatusFilter> = z
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
        z.lazy(() => NestedEnumStatusFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumStatusFilterObjectSchema = Schema;
