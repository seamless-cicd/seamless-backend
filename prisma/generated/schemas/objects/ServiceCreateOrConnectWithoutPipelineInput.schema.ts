import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './ServiceWhereUniqueInput.schema';
import { ServiceCreateWithoutPipelineInputObjectSchema } from './ServiceCreateWithoutPipelineInput.schema';
import { ServiceUncheckedCreateWithoutPipelineInputObjectSchema } from './ServiceUncheckedCreateWithoutPipelineInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutPipelineInput> = z
  .object({
    where: z.lazy(() => ServiceWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ServiceCreateWithoutPipelineInputObjectSchema),
      z.lazy(() => ServiceUncheckedCreateWithoutPipelineInputObjectSchema),
    ]),
  })
  .strict();

export const ServiceCreateOrConnectWithoutPipelineInputObjectSchema = Schema;
