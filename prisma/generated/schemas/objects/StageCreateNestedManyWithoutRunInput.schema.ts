import { z } from 'zod';
import { StageCreateWithoutRunInputObjectSchema } from './StageCreateWithoutRunInput.schema';
import { StageUncheckedCreateWithoutRunInputObjectSchema } from './StageUncheckedCreateWithoutRunInput.schema';
import { StageCreateOrConnectWithoutRunInputObjectSchema } from './StageCreateOrConnectWithoutRunInput.schema';
import { StageCreateManyRunInputEnvelopeObjectSchema } from './StageCreateManyRunInputEnvelope.schema';
import { StageWhereUniqueInputObjectSchema } from './StageWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageCreateNestedManyWithoutRunInput> = z
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
    createMany: z
      .lazy(() => StageCreateManyRunInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => StageWhereUniqueInputObjectSchema),
        z.lazy(() => StageWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const StageCreateNestedManyWithoutRunInputObjectSchema = Schema;
