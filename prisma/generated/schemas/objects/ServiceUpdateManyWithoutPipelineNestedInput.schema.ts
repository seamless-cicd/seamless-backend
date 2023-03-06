import { z } from 'zod';
import { ServiceCreateWithoutPipelineInputObjectSchema } from './ServiceCreateWithoutPipelineInput.schema';
import { ServiceUncheckedCreateWithoutPipelineInputObjectSchema } from './ServiceUncheckedCreateWithoutPipelineInput.schema';
import { ServiceCreateOrConnectWithoutPipelineInputObjectSchema } from './ServiceCreateOrConnectWithoutPipelineInput.schema';
import { ServiceUpsertWithWhereUniqueWithoutPipelineInputObjectSchema } from './ServiceUpsertWithWhereUniqueWithoutPipelineInput.schema';
import { ServiceCreateManyPipelineInputEnvelopeObjectSchema } from './ServiceCreateManyPipelineInputEnvelope.schema';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceUpdateWithWhereUniqueWithoutPipelineInputObjectSchema } from './ServiceUpdateWithWhereUniqueWithoutPipelineInput.schema';
import { ServiceUpdateManyWithWhereWithoutPipelineInputObjectSchema } from './ServiceUpdateManyWithWhereWithoutPipelineInput.schema';
import { ServiceScalarWhereInputObjectSchema } from './ServiceScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpdateManyWithoutPipelineNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(
          () => ServiceUpsertWithWhereUniqueWithoutPipelineInputObjectSchema,
        ),
        z
          .lazy(
            () => ServiceUpsertWithWhereUniqueWithoutPipelineInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ServiceCreateManyPipelineInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ServiceWhereUniqueInputObjectSchema),
        z.lazy(() => ServiceWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ServiceWhereUniqueInputObjectSchema),
        z.lazy(() => ServiceWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ServiceWhereUniqueInputObjectSchema),
        z.lazy(() => ServiceWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ServiceWhereUniqueInputObjectSchema),
        z.lazy(() => ServiceWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => ServiceUpdateWithWhereUniqueWithoutPipelineInputObjectSchema,
        ),
        z
          .lazy(
            () => ServiceUpdateWithWhereUniqueWithoutPipelineInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => ServiceUpdateManyWithWhereWithoutPipelineInputObjectSchema,
        ),
        z
          .lazy(
            () => ServiceUpdateManyWithWhereWithoutPipelineInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ServiceScalarWhereInputObjectSchema),
        z.lazy(() => ServiceScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ServiceUpdateManyWithoutPipelineNestedInputObjectSchema = Schema;
