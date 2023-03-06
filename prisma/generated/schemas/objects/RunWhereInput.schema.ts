import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { EnumTriggerTypeFilterObjectSchema } from './EnumTriggerTypeFilter.schema';
import { TriggerTypeSchema } from '../enums/TriggerType.schema';
import { ServiceRelationFilterObjectSchema } from './ServiceRelationFilter.schema';
import { ServiceWhereInputObjectSchema } from './ServiceWhereInput.schema';
import { StageListRelationFilterObjectSchema } from './StageListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RunWhereInputObjectSchema),
        z.lazy(() => RunWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RunWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RunWhereInputObjectSchema),
        z.lazy(() => RunWhereInputObjectSchema).array(),
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
    startedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    endedAt: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    duration: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    commitHash: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    commitMessage: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    committer: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    status: z
      .union([
        z.lazy(() => EnumStatusFilterObjectSchema),
        z.lazy(() => StatusSchema),
      ])
      .optional(),
    triggerType: z
      .union([
        z.lazy(() => EnumTriggerTypeFilterObjectSchema),
        z.lazy(() => TriggerTypeSchema),
      ])
      .optional(),
    serviceId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    Service: z
      .union([
        z.lazy(() => ServiceRelationFilterObjectSchema),
        z.lazy(() => ServiceWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    stages: z.lazy(() => StageListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const RunWhereInputObjectSchema = Schema;
