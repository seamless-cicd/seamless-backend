import { z } from 'zod';
import { RunScalarWhereInputObjectSchema } from './RunScalarWhereInput.schema';
import { RunUpdateManyMutationInputObjectSchema } from './RunUpdateManyMutationInput.schema';
import { RunUncheckedUpdateManyWithoutRunsInputObjectSchema } from './RunUncheckedUpdateManyWithoutRunsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUpdateManyWithWhereWithoutServiceInput> = z
  .object({
    where: z.lazy(() => RunScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => RunUpdateManyMutationInputObjectSchema),
      z.lazy(() => RunUncheckedUpdateManyWithoutRunsInputObjectSchema),
    ]),
  })
  .strict();

export const RunUpdateManyWithWhereWithoutServiceInputObjectSchema = Schema;
