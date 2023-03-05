import { z } from 'zod';
import { RunUpdateManyMutationInputObjectSchema } from './objects/RunUpdateManyMutationInput.schema';
import { RunWhereInputObjectSchema } from './objects/RunWhereInput.schema';

export const RunUpdateManySchema = z.object({
  data: RunUpdateManyMutationInputObjectSchema,
  where: RunWhereInputObjectSchema.optional(),
});
