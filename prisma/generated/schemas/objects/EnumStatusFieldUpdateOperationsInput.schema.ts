import { z } from 'zod';
import { StatusSchema } from '../enums/Status.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => StatusSchema).optional(),
  })
  .strict();

export const EnumStatusFieldUpdateOperationsInputObjectSchema = Schema;
