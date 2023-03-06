import { z } from 'zod';
import { StageUpdateManyMutationInputObjectSchema } from './objects/StageUpdateManyMutationInput.schema';
import { StageWhereInputObjectSchema } from './objects/StageWhereInput.schema';

export const StageUpdateManySchema = z.object({
  data: StageUpdateManyMutationInputObjectSchema,
  where: StageWhereInputObjectSchema.optional(),
});
