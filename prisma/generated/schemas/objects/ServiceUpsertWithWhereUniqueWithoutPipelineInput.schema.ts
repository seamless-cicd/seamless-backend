import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceUpdateWithoutPipelineInputObjectSchema } from './ServiceUpdateWithoutPipelineInput.schema';
import { ServiceUncheckedUpdateWithoutPipelineInputObjectSchema } from './ServiceUncheckedUpdateWithoutPipelineInput.schema';
import { ServiceCreateWithoutPipelineInputObjectSchema } from './ServiceCreateWithoutPipelineInput.schema';
import { ServiceUncheckedCreateWithoutPipelineInputObjectSchema } from './ServiceUncheckedCreateWithoutPipelineInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpsertWithWhereUniqueWithoutPipelineInput> =
  z
    .object({
      where: z.lazy(() => ServiceWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ServiceUpdateWithoutPipelineInputObjectSchema),
        z.lazy(() => ServiceUncheckedUpdateWithoutPipelineInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ServiceCreateWithoutPipelineInputObjectSchema),
        z.lazy(() => ServiceUncheckedCreateWithoutPipelineInputObjectSchema),
      ]),
    })
    .strict();

export const ServiceUpsertWithWhereUniqueWithoutPipelineInputObjectSchema =
  Schema;
