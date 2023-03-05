import { z } from 'zod';
import { ServiceWhereInputObjectSchema } from './ServiceWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceRelationFilter> = z
  .object({
    is: z
      .lazy(() => ServiceWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ServiceWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ServiceRelationFilterObjectSchema = Schema;
