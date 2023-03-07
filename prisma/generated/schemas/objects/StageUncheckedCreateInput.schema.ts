import { z } from 'zod';
import { StageTypeSchema } from '../enums/StageType.schema';
import { StatusSchema } from '../enums/Status.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    type: z.lazy(() => StageTypeSchema),
    startedAt: z.date().optional().nullable(),
    endedAt: z.date().optional().nullable(),
    duration: z.number().optional().nullable(),
    status: z.lazy(() => StatusSchema).optional(),
    runId: z.string().optional().nullable(),
  })
  .strict();

export const StageUncheckedCreateInputObjectSchema = Schema;