import { z } from 'zod';
import { EnvironmentVariableWhereInputObjectSchema } from './objects/EnvironmentVariableWhereInput.schema';

export const EnvironmentVariableDeleteManySchema = z.object({
  where: EnvironmentVariableWhereInputObjectSchema.optional(),
});
