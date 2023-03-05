import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { ServiceListRelationFilterObjectSchema } from './ServiceListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PipelineWhereInputObjectSchema),
        z.lazy(() => PipelineWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PipelineWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PipelineWhereInputObjectSchema),
        z.lazy(() => PipelineWhereInputObjectSchema).array(),
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
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    githubPat: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    awsAccessKey: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    awsSecretAccessKey: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    services: z.lazy(() => ServiceListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const PipelineWhereInputObjectSchema = Schema;
