import { z } from 'zod';
import { StageCreateManyInputObjectSchema } from './objects/StageCreateManyInput.schema';

export const StageCreateManySchema = z.object({
  data: z.union([
    StageCreateManyInputObjectSchema,
    z.array(StageCreateManyInputObjectSchema),
  ]),
});
