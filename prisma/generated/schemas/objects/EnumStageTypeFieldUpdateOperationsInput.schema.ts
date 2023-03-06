import { z } from 'zod';
import { StageTypeSchema } from '../enums/StageType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStageTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => StageTypeSchema).optional(),
  })
  .strict();

export const EnumStageTypeFieldUpdateOperationsInputObjectSchema = Schema;
