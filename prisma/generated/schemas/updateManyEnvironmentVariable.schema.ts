import { z } from 'zod';
import { EnvironmentVariableUpdateManyMutationInputObjectSchema } from './objects/EnvironmentVariableUpdateManyMutationInput.schema';
import { EnvironmentVariableWhereInputObjectSchema } from './objects/EnvironmentVariableWhereInput.schema';

export const EnvironmentVariableUpdateManySchema = z.object({
  data: EnvironmentVariableUpdateManyMutationInputObjectSchema,
  where: EnvironmentVariableWhereInputObjectSchema.optional(),
});
