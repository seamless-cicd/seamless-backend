import { z } from 'zod';
import { ResourceTypeSchema } from '../enums/ResourceType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumResourceTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => ResourceTypeSchema).optional(),
  })
  .strict();

export const EnumResourceTypeFieldUpdateOperationsInputObjectSchema = Schema;
