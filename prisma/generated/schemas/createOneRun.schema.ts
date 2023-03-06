import { z } from 'zod';
import { RunCreateInputObjectSchema } from './objects/RunCreateInput.schema';
import { RunUncheckedCreateInputObjectSchema } from './objects/RunUncheckedCreateInput.schema';

export const RunCreateOneSchema = z.object({
  data: z.union([
    RunCreateInputObjectSchema,
    RunUncheckedCreateInputObjectSchema,
  ]),
});
