import { z } from 'zod';
import { PipelineCreateWithoutServicesInputObjectSchema } from './PipelineCreateWithoutServicesInput.schema';
import { PipelineUncheckedCreateWithoutServicesInputObjectSchema } from './PipelineUncheckedCreateWithoutServicesInput.schema';
import { PipelineCreateOrConnectWithoutServicesInputObjectSchema } from './PipelineCreateOrConnectWithoutServicesInput.schema';
import { PipelineUpsertWithoutServicesInputObjectSchema } from './PipelineUpsertWithoutServicesInput.schema';
import { PipelineWhereUniqueInputObjectSchema } from './PipelineWhereUniqueInput.schema';
import { PipelineUpdateWithoutServicesInputObjectSchema } from './PipelineUpdateWithoutServicesInput.schema';
import { PipelineUncheckedUpdateWithoutServicesInputObjectSchema } from './PipelineUncheckedUpdateWithoutServicesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineUpdateOneWithoutServicesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PipelineCreateWithoutServicesInputObjectSchema),
        z.lazy(() => PipelineUncheckedCreateWithoutServicesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => PipelineCreateOrConnectWithoutServicesInputObjectSchema)
      .optional(),
    upsert: z
      .lazy(() => PipelineUpsertWithoutServicesInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => PipelineWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => PipelineUpdateWithoutServicesInputObjectSchema),
        z.lazy(() => PipelineUncheckedUpdateWithoutServicesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const PipelineUpdateOneWithoutServicesNestedInputObjectSchema = Schema;
