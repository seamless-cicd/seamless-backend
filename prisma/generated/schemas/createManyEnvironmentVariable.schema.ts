import { z } from 'zod';
import { EnvironmentVariableCreateManyInputObjectSchema } from './objects/EnvironmentVariableCreateManyInput.schema';

export const EnvironmentVariableCreateManySchema = z.object({
  data: z.union([
    EnvironmentVariableCreateManyInputObjectSchema,
    z.array(EnvironmentVariableCreateManyInputObjectSchema),
  ]),
});
