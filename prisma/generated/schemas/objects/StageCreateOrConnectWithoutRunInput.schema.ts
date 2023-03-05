import { z } from 'zod';
import { StageWhereUniqueInputObjectSchema } from './StageWhereUniqueInput.schema';
import { StageCreateWithoutRunInputObjectSchema } from './StageCreateWithoutRunInput.schema';
import { StageUncheckedCreateWithoutRunInputObjectSchema } from './StageUncheckedCreateWithoutRunInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageCreateOrConnectWithoutRunInput> = z
  .object({
    where: z.lazy(() => StageWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => StageCreateWithoutRunInputObjectSchema),
      z.lazy(() => StageUncheckedCreateWithoutRunInputObjectSchema),
    ]),
  })
  .strict();

export const StageCreateOrConnectWithoutRunInputObjectSchema = Schema;
