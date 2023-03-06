import { z } from 'zod';
import { PipelineWhereUniqueInputObjectSchema } from './PipelineWhereUniqueInput.schema';
import { PipelineCreateWithoutServicesInputObjectSchema } from './PipelineCreateWithoutServicesInput.schema';
import { PipelineUncheckedCreateWithoutServicesInputObjectSchema } from './PipelineUncheckedCreateWithoutServicesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PipelineCreateOrConnectWithoutServicesInput> = z
  .object({
    where: z.lazy(() => PipelineWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PipelineCreateWithoutServicesInputObjectSchema),
      z.lazy(() => PipelineUncheckedCreateWithoutServicesInputObjectSchema),
    ]),
  })
  .strict();

export const PipelineCreateOrConnectWithoutServicesInputObjectSchema = Schema;
