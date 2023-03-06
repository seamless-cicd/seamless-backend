import { z } from 'zod';
import { TriggerTypeSchema } from '../enums/TriggerType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumTriggerTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => TriggerTypeSchema).optional(),
  })
  .strict();

export const EnumTriggerTypeFieldUpdateOperationsInputObjectSchema = Schema;
