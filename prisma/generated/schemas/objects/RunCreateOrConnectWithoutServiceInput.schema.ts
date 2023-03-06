import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './RunWhereUniqueInput.schema';
import { RunCreateWithoutServiceInputObjectSchema } from './RunCreateWithoutServiceInput.schema';
import { RunUncheckedCreateWithoutServiceInputObjectSchema } from './RunUncheckedCreateWithoutServiceInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RunCreateOrConnectWithoutServiceInput> = z
  .object({
    where: z.lazy(() => RunWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => RunCreateWithoutServiceInputObjectSchema),
      z.lazy(() => RunUncheckedCreateWithoutServiceInputObjectSchema),
    ]),
  })
  .strict();

export const RunCreateOrConnectWithoutServiceInputObjectSchema = Schema;
