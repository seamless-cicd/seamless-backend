import { z } from 'zod';
import { StageCreateInputObjectSchema } from './objects/StageCreateInput.schema';
import { StageUncheckedCreateInputObjectSchema } from './objects/StageUncheckedCreateInput.schema';

export const StageCreateOneSchema = z.object({
  data: z.union([
    StageCreateInputObjectSchema,
    StageUncheckedCreateInputObjectSchema,
  ]),
});
