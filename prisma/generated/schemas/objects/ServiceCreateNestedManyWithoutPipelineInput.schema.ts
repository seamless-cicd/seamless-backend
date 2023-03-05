import { z } from 'zod';
import { ServiceCreateWithoutPipelineInputObjectSchema } from './ServiceCreateWithoutPipelineInput.schema';
import { ServiceUncheckedCreateWithoutPipelineInputObjectSchema } from './ServiceUncheckedCreateWithoutPipelineInput.schema';
import { ServiceCreateOrConnectWithoutPipelineInputObjectSchema } from './ServiceCreateOrConnectWithoutPipelineInput.schema';
import { ServiceCreateManyPipelineInputEnvelopeObjectSchema } from './ServiceCreateManyPipelineInputEnvelope.schema';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateNestedManyWithoutPipelineInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ServiceCreateWithoutPipelineInputObjectSchema),
        z.lazy(() => ServiceCreateWithoutPipelineInputObjectSchema).array(),
        z.lazy(() => ServiceUncheckedCreateWithoutPipelineInputObjectSchema),
        z
          .lazy(() => ServiceUncheckedCreateWithoutPipelineInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ServiceCreateOrConnectWithoutPipelineInputObjectSchema),
        z
          .lazy(() => ServiceCreateOrConnectWithoutPipelineInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ServiceCreateManyPipelineInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ServiceWhereUniqueInputObjectSchema),
        z.lazy(() => ServiceWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ServiceCreateNestedManyWithoutPipelineInputObjectSchema = Schema;
