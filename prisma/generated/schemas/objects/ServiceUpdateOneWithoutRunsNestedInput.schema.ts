import { z } from 'zod';
import { ServiceCreateWithoutRunsInputObjectSchema } from './ServiceCreateWithoutRunsInput.schema';
import { ServiceUncheckedCreateWithoutRunsInputObjectSchema } from './ServiceUncheckedCreateWithoutRunsInput.schema';
import { ServiceCreateOrConnectWithoutRunsInputObjectSchema } from './ServiceCreateOrConnectWithoutRunsInput.schema';
import { ServiceUpsertWithoutRunsInputObjectSchema } from './ServiceUpsertWithoutRunsInput.schema';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceUpdateWithoutRunsInputObjectSchema } from './ServiceUpdateWithoutRunsInput.schema';
import { ServiceUncheckedUpdateWithoutRunsInputObjectSchema } from './ServiceUncheckedUpdateWithoutRunsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpdateOneWithoutRunsNestedInput> = z
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
    upsert: z.lazy(() => ServiceUpsertWithoutRunsInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ServiceWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ServiceUpdateWithoutRunsInputObjectSchema),
        z.lazy(() => ServiceUncheckedUpdateWithoutRunsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ServiceUpdateOneWithoutRunsNestedInputObjectSchema = Schema;
