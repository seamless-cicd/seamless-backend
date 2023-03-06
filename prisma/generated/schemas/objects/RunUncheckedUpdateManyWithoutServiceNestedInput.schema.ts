import { z } from 'zod';
import { RunCreateWithoutServiceInputObjectSchema } from './RunCreateWithoutServiceInput.schema';
import { RunUncheckedCreateWithoutServiceInputObjectSchema } from './RunUncheckedCreateWithoutServiceInput.schema';
import { RunCreateOrConnectWithoutServiceInputObjectSchema } from './RunCreateOrConnectWithoutServiceInput.schema';
import { RunUpsertWithWhereUniqueWithoutServiceInputObjectSchema } from './RunUpsertWithWhereUniqueWithoutServiceInput.schema';
import { RunCreateManyServiceInputEnvelopeObjectSchema } from './RunCreateManyServiceInputEnvelope.schema';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';
import { RunUpdateWithWhereUniqueWithoutServiceInputObjectSchema } from './RunUpdateWithWhereUniqueWithoutServiceInput.schema';
import { RunUpdateManyWithWhereWithoutServiceInputObjectSchema } from './RunUpdateManyWithWhereWithoutServiceInput.schema';
import { RunScalarWhereInputObjectSchema } from './RunScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUncheckedUpdateManyWithoutServiceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutServiceInputObjectSchema),
          z.lazy(() => RunCreateWithoutServiceInputObjectSchema).array(),
          z.lazy(() => RunUncheckedCreateWithoutServiceInputObjectSchema),
          z
            .lazy(() => RunUncheckedCreateWithoutServiceInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RunCreateOrConnectWithoutServiceInputObjectSchema),
          z
            .lazy(() => RunCreateOrConnectWithoutServiceInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RunUpsertWithWhereUniqueWithoutServiceInputObjectSchema),
          z
            .lazy(() => RunUpsertWithWhereUniqueWithoutServiceInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RunCreateManyServiceInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RunWhereUniqueInputObjectSchema),
          z.lazy(() => RunWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RunWhereUniqueInputObjectSchema),
          z.lazy(() => RunWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RunWhereUniqueInputObjectSchema),
          z.lazy(() => RunWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RunWhereUniqueInputObjectSchema),
          z.lazy(() => RunWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RunUpdateWithWhereUniqueWithoutServiceInputObjectSchema),
          z
            .lazy(() => RunUpdateWithWhereUniqueWithoutServiceInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RunUpdateManyWithWhereWithoutServiceInputObjectSchema),
          z
            .lazy(() => RunUpdateManyWithWhereWithoutServiceInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RunScalarWhereInputObjectSchema),
          z.lazy(() => RunScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RunUncheckedUpdateManyWithoutServiceNestedInputObjectSchema =
  Schema;
