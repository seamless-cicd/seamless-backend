import { z } from 'zod';
import { RunWhereInputObjectSchema } from './objects/RunWhereInput.schema';

export const RunDeleteManySchema = z.object({
  where: RunWhereInputObjectSchema.optional(),
});
