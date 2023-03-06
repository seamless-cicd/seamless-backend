import { z } from 'zod';
import { PipelineCreateWithoutServicesInputObjectSchema } from './PipelineCreateWithoutServicesInput.schema';
import { PipelineUncheckedCreateWithoutServicesInputObjectSchema } from './PipelineUncheckedCreateWithoutServicesInput.schema';
import { PipelineCreateOrConnectWithoutServicesInputObjectSchema } from './PipelineCreateOrConnectWithoutServicesInput.schema';
import { PipelineWhereUniqueInputObjectSchema } from './PipelineWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineCreateNestedOneWithoutServicesInput> = z
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
    connect: z.lazy(() => PipelineWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const PipelineCreateNestedOneWithoutServicesInputObjectSchema = Schema;
