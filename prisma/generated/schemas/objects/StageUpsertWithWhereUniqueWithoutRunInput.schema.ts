import { z } from 'zod';
import { StageWhereUniqueInputObjectSchema } from './StageWhereUniqueInput.schema';
import { StageUpdateWithoutRunInputObjectSchema } from './StageUpdateWithoutRunInput.schema';
import { StageUncheckedUpdateWithoutRunInputObjectSchema } from './StageUncheckedUpdateWithoutRunInput.schema';
import { StageCreateWithoutRunInputObjectSchema } from './StageCreateWithoutRunInput.schema';
import { StageUncheckedCreateWithoutRunInputObjectSchema } from './StageUncheckedCreateWithoutRunInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageUpsertWithWhereUniqueWithoutRunInput> = z
  .object({
    where: z.lazy(() => StageWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => StageUpdateWithoutRunInputObjectSchema),
      z.lazy(() => StageUncheckedUpdateWithoutRunInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => StageCreateWithoutRunInputObjectSchema),
      z.lazy(() => StageUncheckedCreateWithoutRunInputObjectSchema),
    ]),
  })
  .strict();

export const StageUpsertWithWhereUniqueWithoutRunInputObjectSchema = Schema;
