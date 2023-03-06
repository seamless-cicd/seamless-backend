import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumResourceTypeFilterObjectSchema } from './EnumResourceTypeFilter.schema';
import { ResourceTypeSchema } from '../enums/ResourceType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnvironmentVariableWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EnvironmentVariableWhereInputObjectSchema),
        z.lazy(() => EnvironmentVariableWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EnvironmentVariableWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EnvironmentVariableWhereInputObjectSchema),
        z.lazy(() => EnvironmentVariableWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    resourceId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    resourceType: z
      .union([
        z.lazy(() => EnumResourceTypeFilterObjectSchema),
        z.lazy(() => ResourceTypeSchema),
      ])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    value: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const EnvironmentVariableWhereInputObjectSchema = Schema;
