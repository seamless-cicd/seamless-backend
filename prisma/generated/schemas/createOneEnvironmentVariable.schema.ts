import { z } from 'zod';
import { EnvironmentVariableCreateInputObjectSchema } from './objects/EnvironmentVariableCreateInput.schema';
import { EnvironmentVariableUncheckedCreateInputObjectSchema } from './objects/EnvironmentVariableUncheckedCreateInput.schema';

export const EnvironmentVariableCreateOneSchema = z.object({
  data: z.union([
    EnvironmentVariableCreateInputObjectSchema,
    EnvironmentVariableUncheckedCreateInputObjectSchema,
  ]),
});
