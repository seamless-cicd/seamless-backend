import { z } from 'zod';
import { RunCreateManyServiceInputObjectSchema } from './RunCreateManyServiceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunCreateManyServiceInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => RunCreateManyServiceInputObjectSchema),
      z.lazy(() => RunCreateManyServiceInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RunCreateManyServiceInputEnvelopeObjectSchema = Schema;
