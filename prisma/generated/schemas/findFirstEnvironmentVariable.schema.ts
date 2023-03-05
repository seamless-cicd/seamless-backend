import { z } from 'zod';
import { EnvironmentVariableOrderByWithRelationInputObjectSchema } from './objects/EnvironmentVariableOrderByWithRelationInput.schema';
import { EnvironmentVariableWhereInputObjectSchema } from './objects/EnvironmentVariableWhereInput.schema';
import { EnvironmentVariableWhereUniqueInputObjectSchema } from './objects/EnvironmentVariableWhereUniqueInput.schema';
import { EnvironmentVariableScalarFieldEnumSchema } from './enums/EnvironmentVariableScalarFieldEnum.schema';

export const EnvironmentVariableFindFirstSchema = z.object({
  orderBy: z
    .union([
      EnvironmentVariableOrderByWithRelationInputObjectSchema,
      EnvironmentVariableOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: EnvironmentVariableWhereInputObjectSchema.optional(),
  cursor: EnvironmentVariableWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(EnvironmentVariableScalarFieldEnumSchema).optional(),
});
