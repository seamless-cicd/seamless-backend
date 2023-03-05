import { z } from 'zod';
import { EnvironmentVariableOrderByWithRelationInputObjectSchema } from './objects/EnvironmentVariableOrderByWithRelationInput.schema';
import { EnvironmentVariableWhereInputObjectSchema } from './objects/EnvironmentVariableWhereInput.schema';
import { EnvironmentVariableWhereUniqueInputObjectSchema } from './objects/EnvironmentVariableWhereUniqueInput.schema';
import { EnvironmentVariableCountAggregateInputObjectSchema } from './objects/EnvironmentVariableCountAggregateInput.schema';
import { EnvironmentVariableMinAggregateInputObjectSchema } from './objects/EnvironmentVariableMinAggregateInput.schema';
import { EnvironmentVariableMaxAggregateInputObjectSchema } from './objects/EnvironmentVariableMaxAggregateInput.schema';

export const EnvironmentVariableAggregateSchema = z.object({
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
  _count: z
    .union([
      z.literal(true),
      EnvironmentVariableCountAggregateInputObjectSchema,
    ])
    .optional(),
  _min: EnvironmentVariableMinAggregateInputObjectSchema.optional(),
  _max: EnvironmentVariableMaxAggregateInputObjectSchema.optional(),
});
