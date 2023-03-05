import { z } from 'zod';
import { PipelineUpdateWithoutServicesInputObjectSchema } from './PipelineUpdateWithoutServicesInput.schema';
import { PipelineUncheckedUpdateWithoutServicesInputObjectSchema } from './PipelineUncheckedUpdateWithoutServicesInput.schema';
import { PipelineCreateWithoutServicesInputObjectSchema } from './PipelineCreateWithoutServicesInput.schema';
import { PipelineUncheckedCreateWithoutServicesInputObjectSchema } from './PipelineUncheckedCreateWithoutServicesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineUpsertWithoutServicesInput> = z
  .object({
    update: z.union([
      z.lazy(() => PipelineUpdateWithoutServicesInputObjectSchema),
      z.lazy(() => PipelineUncheckedUpdateWithoutServicesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => PipelineCreateWithoutServicesInputObjectSchema),
      z.lazy(() => PipelineUncheckedCreateWithoutServicesInputObjectSchema),
    ]),
  })
  .strict();

export const PipelineUpsertWithoutServicesInputObjectSchema = Schema;
