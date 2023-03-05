import { z } from 'zod';
import { ServiceCreateManyPipelineInputObjectSchema } from './ServiceCreateManyPipelineInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateManyPipelineInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ServiceCreateManyPipelineInputObjectSchema),
      z.lazy(() => ServiceCreateManyPipelineInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ServiceCreateManyPipelineInputEnvelopeObjectSchema = Schema;
