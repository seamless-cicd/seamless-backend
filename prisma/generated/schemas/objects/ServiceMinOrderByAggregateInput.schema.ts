import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    lastRunAt: z.lazy(() => SortOrderSchema).optional(),
    triggerOnMain: z.lazy(() => SortOrderSchema).optional(),
    triggerOnPrOpen: z.lazy(() => SortOrderSchema).optional(),
    triggerOnPrSync: z.lazy(() => SortOrderSchema).optional(),
    useStaging: z.lazy(() => SortOrderSchema).optional(),
    autoDeploy: z.lazy(() => SortOrderSchema).optional(),
    githubRepoUrl: z.lazy(() => SortOrderSchema).optional(),
    unitTestCommand: z.lazy(() => SortOrderSchema).optional(),
    integrationTestCommand: z.lazy(() => SortOrderSchema).optional(),
    codeQualityCommand: z.lazy(() => SortOrderSchema).optional(),
    dockerfilePath: z.lazy(() => SortOrderSchema).optional(),
    dockerComposeFilePath: z.lazy(() => SortOrderSchema).optional(),
    pipelineId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ServiceMinOrderByAggregateInputObjectSchema = Schema;
