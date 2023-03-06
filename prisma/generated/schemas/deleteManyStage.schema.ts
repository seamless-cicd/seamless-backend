import { z } from 'zod';
import { StageWhereInputObjectSchema } from './objects/StageWhereInput.schema';

export const StageDeleteManySchema = z.object({
  where: StageWhereInputObjectSchema.optional(),
});
