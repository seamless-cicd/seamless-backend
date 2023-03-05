import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';
import { RunUpdateWithoutServiceInputObjectSchema } from './RunUpdateWithoutServiceInput.schema';
import { RunUncheckedUpdateWithoutServiceInputObjectSchema } from './RunUncheckedUpdateWithoutServiceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUpdateWithWhereUniqueWithoutServiceInput> = z
  .object({
    where: z.lazy(() => RunWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => RunUpdateWithoutServiceInputObjectSchema),
      z.lazy(() => RunUncheckedUpdateWithoutServiceInputObjectSchema),
    ]),
  })
  .strict();

export const RunUpdateWithWhereUniqueWithoutServiceInputObjectSchema = Schema;
