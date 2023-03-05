import { z } from 'zod';
import { EnvironmentVariableWhereUniqueInputObjectSchema } from './objects/EnvironmentVariableWhereUniqueInput.schema';

export const EnvironmentVariableFindUniqueSchema = z.object({
  where: EnvironmentVariableWhereUniqueInputObjectSchema,
});
