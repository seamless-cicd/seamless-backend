import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceCreateWithoutRunsInputObjectSchema } from './ServiceCreateWithoutRunsInput.schema';
import { ServiceUncheckedCreateWithoutRunsInputObjectSchema } from './ServiceUncheckedCreateWithoutRunsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutRunsInput> = z
  .object({
    where: z.lazy(() => ServiceWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ServiceCreateWithoutRunsInputObjectSchema),
      z.lazy(() => ServiceUncheckedCreateWithoutRunsInputObjectSchema),
    ]),
  })
  .strict();

export const ServiceCreateOrConnectWithoutRunsInputObjectSchema = Schema;
