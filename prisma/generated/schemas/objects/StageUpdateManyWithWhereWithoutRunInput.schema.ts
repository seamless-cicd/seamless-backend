import { z } from 'zod';
import { StageScalarWhereInputObjectSchema } from './StageScalarWhereInput.schema';
import { StageUpdateManyMutationInputObjectSchema } from './StageUpdateManyMutationInput.schema';
import { StageUncheckedUpdateManyWithoutStagesInputObjectSchema } from './StageUncheckedUpdateManyWithoutStagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.StageUpdateManyWithWhereWithoutRunInput> = z
  .object({
    where: z.lazy(() => StageScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => StageUpdateManyMutationInputObjectSchema),
      z.lazy(() => StageUncheckedUpdateManyWithoutStagesInputObjectSchema),
    ]),
  })
  .strict();

export const StageUpdateManyWithWhereWithoutRunInputObjectSchema = Schema;
