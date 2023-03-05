import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';
import { RunCreateWithoutStagesInputObjectSchema } from './RunCreateWithoutStagesInput.schema';
import { RunUncheckedCreateWithoutStagesInputObjectSchema } from './RunUncheckedCreateWithoutStagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunCreateOrConnectWithoutStagesInput> = z
  .object({
    where: z.lazy(() => RunWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => RunCreateWithoutStagesInputObjectSchema),
      z.lazy(() => RunUncheckedCreateWithoutStagesInputObjectSchema),
    ]),
  })
  .strict();

export const RunCreateOrConnectWithoutStagesInputObjectSchema = Schema;
