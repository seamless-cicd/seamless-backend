import { z } from 'zod';
import { EnvironmentVariableUpdateInputObjectSchema } from './objects/EnvironmentVariableUpdateInput.schema';
import { EnvironmentVariableUncheckedUpdateInputObjectSchema } from './objects/EnvironmentVariableUncheckedUpdateInput.schema';
import { EnvironmentVariableWhereUniqueInputObjectSchema } from './objects/EnvironmentVariableWhereUniqueInput.schema';

export const EnvironmentVariableUpdateOneSchema = z.object({
  data: z.union([
    EnvironmentVariableUpdateInputObjectSchema,
    EnvironmentVariableUncheckedUpdateInputObjectSchema,
  ]),
  where: EnvironmentVariableWhereUniqueInputObjectSchema,
});
