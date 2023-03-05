import { z } from 'zod';
import { ResourceTypeSchema } from '../enums/ResourceType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnvironmentVariableCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    resourceId: z.string(),
    resourceType: z.lazy(() => ResourceTypeSchema),
    name: z.string(),
    value: z.string(),
  })
  .strict();

export const EnvironmentVariableCreateInputObjectSchema = Schema;
