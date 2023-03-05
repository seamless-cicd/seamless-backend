import { z } from 'zod';
import { RunCreateWithoutServiceInputObjectSchema } from './RunCreateWithoutServiceInput.schema';
import { RunUncheckedCreateWithoutServiceInputObjectSchema } from './RunUncheckedCreateWithoutServiceInput.schema';
import { RunCreateOrConnectWithoutServiceInputObjectSchema } from './RunCreateOrConnectWithoutServiceInput.schema';
import { RunCreateManyServiceInputEnvelopeObjectSchema } from './RunCreateManyServiceInputEnvelope.schema';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUncheckedCreateNestedManyWithoutServiceInput> =
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
      createMany: z
        .lazy(() => RunCreateManyServiceInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RunWhereUniqueInputObjectSchema),
          z.lazy(() => RunWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RunUncheckedCreateNestedManyWithoutServiceInputObjectSchema =
  Schema;
