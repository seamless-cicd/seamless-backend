import { z } from 'zod';
import { RunUpdateInputObjectSchema } from './objects/RunUpdateInput.schema';
import { RunUncheckedUpdateInputObjectSchema } from './objects/RunUncheckedUpdateInput.schema';
import { RunWhereUniqueInputObjectSchema } from './objects/RunWhereUniqueInput.schema';

export const RunUpdateOneSchema = z.object({
  data: z.union([
    RunUpdateInputObjectSchema,
    RunUncheckedUpdateInputObjectSchema,
  ]),
  where: RunWhereUniqueInputObjectSchema,
});
