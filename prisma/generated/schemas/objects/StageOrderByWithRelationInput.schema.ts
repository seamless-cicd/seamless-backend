import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RunOrderByWithRelationInputObjectSchema } from './RunOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    startedAt: z.lazy(() => SortOrderSchema).optional(),
    endedAt: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    runId: z.lazy(() => SortOrderSchema).optional(),
    Run: z.lazy(() => RunOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const StageOrderByWithRelationInputObjectSchema = Schema;
