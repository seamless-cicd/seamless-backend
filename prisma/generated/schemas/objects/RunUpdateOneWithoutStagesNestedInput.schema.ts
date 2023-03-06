import { z } from 'zod';
import { RunCreateWithoutStagesInputObjectSchema } from './RunCreateWithoutStagesInput.schema';
import { RunUncheckedCreateWithoutStagesInputObjectSchema } from './RunUncheckedCreateWithoutStagesInput.schema';
import { RunCreateOrConnectWithoutStagesInputObjectSchema } from './RunCreateOrConnectWithoutStagesInput.schema';
import { RunUpsertWithoutStagesInputObjectSchema } from './RunUpsertWithoutStagesInput.schema';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';
import { RunUpdateWithoutStagesInputObjectSchema } from './RunUpdateWithoutStagesInput.schema';
import { RunUncheckedUpdateWithoutStagesInputObjectSchema } from './RunUncheckedUpdateWithoutStagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUpdateOneWithoutStagesNestedInput> = z
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
    upsert: z.lazy(() => RunUpsertWithoutStagesInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => RunWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => RunUpdateWithoutStagesInputObjectSchema),
        z.lazy(() => RunUncheckedUpdateWithoutStagesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const RunUpdateOneWithoutStagesNestedInputObjectSchema = Schema;
