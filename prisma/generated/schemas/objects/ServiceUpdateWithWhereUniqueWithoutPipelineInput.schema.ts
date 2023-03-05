import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceUpdateWithoutPipelineInputObjectSchema } from './ServiceUpdateWithoutPipelineInput.schema';
import { ServiceUncheckedUpdateWithoutPipelineInputObjectSchema } from './ServiceUncheckedUpdateWithoutPipelineInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpdateWithWhereUniqueWithoutPipelineInput> =
  z
    .object({
      where: z.lazy(() => ServiceWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ServiceUpdateWithoutPipelineInputObjectSchema),
        z.lazy(() => ServiceUncheckedUpdateWithoutPipelineInputObjectSchema),
      ]),
    })
    .strict();

export const ServiceUpdateWithWhereUniqueWithoutPipelineInputObjectSchema =
  Schema;
