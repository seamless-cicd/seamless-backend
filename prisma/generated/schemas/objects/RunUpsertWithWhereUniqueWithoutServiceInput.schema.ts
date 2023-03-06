import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';
import { RunUpdateWithoutServiceInputObjectSchema } from './RunUpdateWithoutServiceInput.schema';
import { RunUncheckedUpdateWithoutServiceInputObjectSchema } from './RunUncheckedUpdateWithoutServiceInput.schema';
import { RunCreateWithoutServiceInputObjectSchema } from './RunCreateWithoutServiceInput.schema';
import { RunUncheckedCreateWithoutServiceInputObjectSchema } from './RunUncheckedCreateWithoutServiceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunUpsertWithWhereUniqueWithoutServiceInput> = z
  .object({
    where: z.lazy(() => RunWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => RunUpdateWithoutServiceInputObjectSchema),
      z.lazy(() => RunUncheckedUpdateWithoutServiceInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => RunCreateWithoutServiceInputObjectSchema),
      z.lazy(() => RunUncheckedCreateWithoutServiceInputObjectSchema),
    ]),
  })
  .strict();

export const RunUpsertWithWhereUniqueWithoutServiceInputObjectSchema = Schema;
