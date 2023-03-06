import { z } from 'zod';
import { ServiceWhereInputObjectSchema } from './objects/ServiceWhereInput.schema';
import { ServiceOrderByWithAggregationInputObjectSchema } from './objects/ServiceOrderByWithAggregationInput.schema';
import { ServiceScalarWhereWithAggregatesInputObjectSchema } from './objects/ServiceScalarWhereWithAggregatesInput.schema';
import { ServiceScalarFieldEnumSchema } from './enums/ServiceScalarFieldEnum.schema';

export const ServiceGroupBySchema = z.object({
  where: ServiceWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ServiceOrderByWithAggregationInputObjectSchema,
      ServiceOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ServiceScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ServiceScalarFieldEnumSchema),
});
