import { z } from 'zod';
import { EnvironmentVariableWhereInputObjectSchema } from './objects/EnvironmentVariableWhereInput.schema';
import { EnvironmentVariableOrderByWithAggregationInputObjectSchema } from './objects/EnvironmentVariableOrderByWithAggregationInput.schema';
import { EnvironmentVariableScalarWhereWithAggregatesInputObjectSchema } from './objects/EnvironmentVariableScalarWhereWithAggregatesInput.schema';
import { EnvironmentVariableScalarFieldEnumSchema } from './enums/EnvironmentVariableScalarFieldEnum.schema';

export const EnvironmentVariableGroupBySchema = z.object({
  where: EnvironmentVariableWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      EnvironmentVariableOrderByWithAggregationInputObjectSchema,
      EnvironmentVariableOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having:
    EnvironmentVariableScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(EnvironmentVariableScalarFieldEnumSchema),
});
