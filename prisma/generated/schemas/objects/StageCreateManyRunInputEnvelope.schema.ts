import { z } from 'zod';
import { StageCreateManyRunInputObjectSchema } from './StageCreateManyRunInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageCreateManyRunInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => StageCreateManyRunInputObjectSchema),
      z.lazy(() => StageCreateManyRunInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const StageCreateManyRunInputEnvelopeObjectSchema = Schema;
