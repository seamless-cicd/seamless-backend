import { z } from 'zod';
import { StageCreateWithoutRunInputObjectSchema } from './StageCreateWithoutRunInput.schema';
import { StageUncheckedCreateWithoutRunInputObjectSchema } from './StageUncheckedCreateWithoutRunInput.schema';
import { StageCreateOrConnectWithoutRunInputObjectSchema } from './StageCreateOrConnectWithoutRunInput.schema';
import { StageUpsertWithWhereUniqueWithoutRunInputObjectSchema } from './StageUpsertWithWhereUniqueWithoutRunInput.schema';
import { StageCreateManyRunInputEnvelopeObjectSchema } from './StageCreateManyRunInputEnvelope.schema';
import { StageWhereUniqueInputObjectSchema } from './StageWhereUniqueInput.schema';
import { StageUpdateWithWhereUniqueWithoutRunInputObjectSchema } from './StageUpdateWithWhereUniqueWithoutRunInput.schema';
import { StageUpdateManyWithWhereWithoutRunInputObjectSchema } from './StageUpdateManyWithWhereWithoutRunInput.schema';
import { StageScalarWhereInputObjectSchema } from './StageScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageUpdateManyWithoutRunNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => StageCreateWithoutRunInputObjectSchema),
        z.lazy(() => StageCreateWithoutRunInputObjectSchema).array(),
        z.lazy(() => StageUncheckedCreateWithoutRunInputObjectSchema),
        z.lazy(() => StageUncheckedCreateWithoutRunInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => StageCreateOrConnectWithoutRunInputObjectSchema),
        z.lazy(() => StageCreateOrConnectWithoutRunInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => StageUpsertWithWhereUniqueWithoutRunInputObjectSchema),
        z
          .lazy(() => StageUpsertWithWhereUniqueWithoutRunInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => StageCreateManyRunInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => StageWhereUniqueInputObjectSchema),
        z.lazy(() => StageWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => StageWhereUniqueInputObjectSchema),
        z.lazy(() => StageWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => StageWhereUniqueInputObjectSchema),
        z.lazy(() => StageWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => StageWhereUniqueInputObjectSchema),
        z.lazy(() => StageWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => StageUpdateWithWhereUniqueWithoutRunInputObjectSchema),
        z
          .lazy(() => StageUpdateWithWhereUniqueWithoutRunInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => StageUpdateManyWithWhereWithoutRunInputObjectSchema),
        z
          .lazy(() => StageUpdateManyWithWhereWithoutRunInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => StageScalarWhereInputObjectSchema),
        z.lazy(() => StageScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const StageUpdateManyWithoutRunNestedInputObjectSchema = Schema;
