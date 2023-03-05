import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumStageTypeFilterObjectSchema } from './EnumStageTypeFilter.schema';
import { StageTypeSchema } from '../enums/StageType.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { RunRelationFilterObjectSchema } from './RunRelationFilter.schema';
import { RunWhereInputObjectSchema } from './RunWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => StageWhereInputObjectSchema),
        z.lazy(() => StageWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => StageWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => StageWhereInputObjectSchema),
        z.lazy(() => StageWhereInputObjectSchema).array(),
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
    type: z
      .union([
        z.lazy(() => EnumStageTypeFilterObjectSchema),
        z.lazy(() => StageTypeSchema),
      ])
      .optional(),
    startedAt: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    endedAt: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    duration: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    status: z
      .union([
        z.lazy(() => EnumStatusFilterObjectSchema),
        z.lazy(() => StatusSchema),
      ])
      .optional(),
    runId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    Run: z
      .union([
        z.lazy(() => RunRelationFilterObjectSchema),
        z.lazy(() => RunWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const StageWhereInputObjectSchema = Schema;
