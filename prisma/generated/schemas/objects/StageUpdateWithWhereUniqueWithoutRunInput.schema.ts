import { z } from 'zod';
import { StageWhereUniqueInputObjectSchema } from './StageWhereUniqueInput.schema';
import { StageUpdateWithoutRunInputObjectSchema } from './StageUpdateWithoutRunInput.schema';
import { StageUncheckedUpdateWithoutRunInputObjectSchema } from './StageUncheckedUpdateWithoutRunInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageUpdateWithWhereUniqueWithoutRunInput> = z
  .object({
    where: z.lazy(() => StageWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => StageUpdateWithoutRunInputObjectSchema),
      z.lazy(() => StageUncheckedUpdateWithoutRunInputObjectSchema),
    ]),
  })
  .strict();

export const StageUpdateWithWhereUniqueWithoutRunInputObjectSchema = Schema;
