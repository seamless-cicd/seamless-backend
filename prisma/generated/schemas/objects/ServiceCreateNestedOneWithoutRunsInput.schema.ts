import { z } from 'zod';
import { ServiceCreateWithoutRunsInputObjectSchema } from './ServiceCreateWithoutRunsInput.schema';
import { ServiceUncheckedCreateWithoutRunsInputObjectSchema } from './ServiceUncheckedCreateWithoutRunsInput.schema';
import { ServiceCreateOrConnectWithoutRunsInputObjectSchema } from './ServiceCreateOrConnectWithoutRunsInput.schema';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutRunsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ServiceCreateWithoutRunsInputObjectSchema),
        z.lazy(() => ServiceUncheckedCreateWithoutRunsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ServiceCreateOrConnectWithoutRunsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ServiceWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ServiceCreateNestedOneWithoutRunsInputObjectSchema = Schema;
