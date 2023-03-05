import { z } from 'zod';
import { ServiceWhereInputObjectSchema } from './ServiceWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServiceListRelationFilter> = z
  .object({
    every: z.lazy(() => ServiceWhereInputObjectSchema).optional(),
    some: z.lazy(() => ServiceWhereInputObjectSchema).optional(),
    none: z.lazy(() => ServiceWhereInputObjectSchema).optional(),
  })
  .strict();

export const ServiceListRelationFilterObjectSchema = Schema;
