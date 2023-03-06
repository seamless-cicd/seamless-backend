import { z } from 'zod';
import { EnvironmentVariableWhereUniqueInputObjectSchema } from './objects/EnvironmentVariableWhereUniqueInput.schema';
import { EnvironmentVariableCreateInputObjectSchema } from './objects/EnvironmentVariableCreateInput.schema';
import { EnvironmentVariableUncheckedCreateInputObjectSchema } from './objects/EnvironmentVariableUncheckedCreateInput.schema';
import { EnvironmentVariableUpdateInputObjectSchema } from './objects/EnvironmentVariableUpdateInput.schema';
import { EnvironmentVariableUncheckedUpdateInputObjectSchema } from './objects/EnvironmentVariableUncheckedUpdateInput.schema';

export const EnvironmentVariableUpsertSchema = z.object({
  where: EnvironmentVariableWhereUniqueInputObjectSchema,
  create: z.union([
    EnvironmentVariableCreateInputObjectSchema,
    EnvironmentVariableUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    EnvironmentVariableUpdateInputObjectSchema,
    EnvironmentVariableUncheckedUpdateInputObjectSchema,
  ]),
});
