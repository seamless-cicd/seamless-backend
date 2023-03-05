import { z } from 'zod';
import { RunCreateWithoutStagesInputObjectSchema } from './RunCreateWithoutStagesInput.schema';
import { RunUncheckedCreateWithoutStagesInputObjectSchema } from './RunUncheckedCreateWithoutStagesInput.schema';
import { RunCreateOrConnectWithoutStagesInputObjectSchema } from './RunCreateOrConnectWithoutStagesInput.schema';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunCreateNestedOneWithoutStagesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => RunCreateWithoutStagesInputObjectSchema),
        z.lazy(() => RunUncheckedCreateWithoutStagesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => RunCreateOrConnectWithoutStagesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => RunWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const RunCreateNestedOneWithoutStagesInputObjectSchema = Schema;
