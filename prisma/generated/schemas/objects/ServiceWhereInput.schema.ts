import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { PipelineRelationFilterObjectSchema } from './PipelineRelationFilter.schema';
import { PipelineWhereInputObjectSchema } from './PipelineWhereInput.schema';
import { RunListRelationFilterObjectSchema } from './RunListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ServiceWhereInputObjectSchema),
        z.lazy(() => ServiceWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ServiceWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ServiceWhereInputObjectSchema),
        z.lazy(() => ServiceWhereInputObjectSchema).array(),
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
    lastRunAt: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    triggerOnMain: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    triggerOnPrOpen: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    triggerOnPrSync: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    useStaging: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    autoDeploy: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    githubRepoUrl: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    unitTestCommand: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    integrationTestCommand: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    codeQualityCommand: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    dockerfilePath: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    dockerComposeFilePath: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    pipelineId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    Pipeline: z
      .union([
        z.lazy(() => PipelineRelationFilterObjectSchema),
        z.lazy(() => PipelineWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    runs: z.lazy(() => RunListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const ServiceWhereInputObjectSchema = Schema;
