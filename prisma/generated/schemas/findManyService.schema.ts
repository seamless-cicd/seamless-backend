import { z } from 'zod';
import { ServiceOrderByWithRelationInputObjectSchema } from './objects/ServiceOrderByWithRelationInput.schema';
import { ServiceWhereInputObjectSchema } from './objects/ServiceWhereInput.schema';
import { ServiceWhereUniqueInputObjectSchema } from './objects/ServiceWhereUniqueInput.schema';
import { ServiceScalarFieldEnumSchema } from './enums/ServiceScalarFieldEnum.schema';

export const ServiceFindManySchema = z.object({
  orderBy: z
    .union([
      ServiceOrderByWithRelationInputObjectSchema,
      ServiceOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ServiceWhereInputObjectSchema.optional(),
  cursor: ServiceWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ServiceScalarFieldEnumSchema).optional(),
});
