import { z } from 'zod';
import { ServiceUpdateWithoutRunsInputObjectSchema } from './ServiceUpdateWithoutRunsInput.schema';
import { ServiceUncheckedUpdateWithoutRunsInputObjectSchema } from './ServiceUncheckedUpdateWithoutRunsInput.schema';
import { ServiceCreateWithoutRunsInputObjectSchema } from './ServiceCreateWithoutRunsInput.schema';
import { ServiceUncheckedCreateWithoutRunsInputObjectSchema } from './ServiceUncheckedCreateWithoutRunsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpsertWithoutRunsInput> = z
  .object({
    update: z.union([
      z.lazy(() => ServiceUpdateWithoutRunsInputObjectSchema),
      z.lazy(() => ServiceUncheckedUpdateWithoutRunsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ServiceCreateWithoutRunsInputObjectSchema),
      z.lazy(() => ServiceUncheckedCreateWithoutRunsInputObjectSchema),
    ]),
  })
  .strict();

export const ServiceUpsertWithoutRunsInputObjectSchema = Schema;
