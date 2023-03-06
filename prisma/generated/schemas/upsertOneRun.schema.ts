import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './objects/RunWhereUniqueInput.schema';
import { RunCreateInputObjectSchema } from './objects/RunCreateInput.schema';
import { RunUncheckedCreateInputObjectSchema } from './objects/RunUncheckedCreateInput.schema';
import { RunUpdateInputObjectSchema } from './objects/RunUpdateInput.schema';
import { RunUncheckedUpdateInputObjectSchema } from './objects/RunUncheckedUpdateInput.schema';

export const RunUpsertSchema = z.object({
  where: RunWhereUniqueInputObjectSchema,
  create: z.union([
    RunCreateInputObjectSchema,
    RunUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    RunUpdateInputObjectSchema,
    RunUncheckedUpdateInputObjectSchema,
  ]),
});
