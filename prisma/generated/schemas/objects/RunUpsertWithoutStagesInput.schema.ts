import { z } from 'zod';
import { RunUpdateWithoutStagesInputObjectSchema } from './RunUpdateWithoutStagesInput.schema';
import { RunUncheckedUpdateWithoutStagesInputObjectSchema } from './RunUncheckedUpdateWithoutStagesInput.schema';
import { RunCreateWithoutStagesInputObjectSchema } from './RunCreateWithoutStagesInput.schema';
import { RunUncheckedCreateWithoutStagesInputObjectSchema } from './RunUncheckedCreateWithoutStagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUpsertWithoutStagesInput> = z
  .object({
    update: z.union([
      z.lazy(() => RunUpdateWithoutStagesInputObjectSchema),
      z.lazy(() => RunUncheckedUpdateWithoutStagesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => RunCreateWithoutStagesInputObjectSchema),
      z.lazy(() => RunUncheckedCreateWithoutStagesInputObjectSchema),
    ]),
  })
  .strict();

export const RunUpsertWithoutStagesInputObjectSchema = Schema;
