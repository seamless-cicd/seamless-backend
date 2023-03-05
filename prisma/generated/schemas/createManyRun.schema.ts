import { z } from 'zod';
import { RunCreateManyInputObjectSchema } from './objects/RunCreateManyInput.schema';

export const RunCreateManySchema = z.object({
  data: z.union([
    RunCreateManyInputObjectSchema,
    z.array(RunCreateManyInputObjectSchema),
  ]),
});
