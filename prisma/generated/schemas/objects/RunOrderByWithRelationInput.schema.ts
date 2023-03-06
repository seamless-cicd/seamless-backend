import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ServiceOrderByWithRelationInputObjectSchema } from './ServiceOrderByWithRelationInput.schema';
import { StageOrderByRelationAggregateInputObjectSchema } from './StageOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endedAt: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    commitHash: z.lazy(() => SortOrderSchema).optional(),
    commitMessage: z.lazy(() => SortOrderSchema).optional(),
    committer: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    triggerType: z.lazy(() => SortOrderSchema).optional(),
    serviceId: z.lazy(() => SortOrderSchema).optional(),
    Service: z
      .lazy(() => ServiceOrderByWithRelationInputObjectSchema)
      .optional(),
    stages: z
      .lazy(() => StageOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const RunOrderByWithRelationInputObjectSchema = Schema;
