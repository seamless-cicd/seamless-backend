import { z } from 'zod';
import { StatusSchema } from '../enums/Status.schema';
import { TriggerTypeSchema } from '../enums/TriggerType.schema';
import { StageUncheckedCreateNestedManyWithoutRunInputObjectSchema } from './StageUncheckedCreateNestedManyWithoutRunInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUncheckedCreateWithoutServiceInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    startedAt: z.date().optional(),
    endedAt: z.date().optional().nullable(),
    duration: z.number().optional().nullable(),
    commitHash: z.string().optional().nullable(),
    commitMessage: z.string().optional().nullable(),
    committer: z.string().optional().nullable(),
    status: z.lazy(() => StatusSchema).optional(),
    triggerType: z.lazy(() => TriggerTypeSchema),
    stages: z
      .lazy(() => StageUncheckedCreateNestedManyWithoutRunInputObjectSchema)
      .optional(),
  })
  .strict();

export const RunUncheckedCreateWithoutServiceInputObjectSchema = Schema;
