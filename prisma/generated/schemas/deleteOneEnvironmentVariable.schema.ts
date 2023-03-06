import { z } from 'zod';
import { EnvironmentVariableWhereUniqueInputObjectSchema } from './objects/EnvironmentVariableWhereUniqueInput.schema';

export const EnvironmentVariableDeleteOneSchema = z.object({
  where: EnvironmentVariableWhereUniqueInputObjectSchema,
});
