import { z } from 'zod';
import { ServiceScalarWhereInputObjectSchema } from './ServiceScalarWhereInput.schema';
import { ServiceUpdateManyMutationInputObjectSchema } from './ServiceUpdateManyMutationInput.schema';
import { ServiceUncheckedUpdateManyWithoutServicesInputObjectSchema } from './ServiceUncheckedUpdateManyWithoutServicesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceUpdateManyWithWhereWithoutPipelineInput> =
  z
    .object({
      where: z.lazy(() => ServiceScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ServiceUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => ServiceUncheckedUpdateManyWithoutServicesInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ServiceUpdateManyWithWhereWithoutPipelineInputObjectSchema =
  Schema;
