import { z } from 'zod';
import { StageWhereUniqueInputObjectSchema } from './objects/StageWhereUniqueInput.schema';
import { StageCreateInputObjectSchema } from './objects/StageCreateInput.schema';
import { StageUncheckedCreateInputObjectSchema } from './objects/StageUncheckedCreateInput.schema';
import { StageUpdateInputObjectSchema } from './objects/StageUpdateInput.schema';
import { StageUncheckedUpdateInputObjectSchema } from './objects/StageUncheckedUpdateInput.schema';

export const StageUpsertSchema = z.object({
  where: StageWhereUniqueInputObjectSchema,
  create: z.union([
    StageCreateInputObjectSchema,
    StageUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    StageUpdateInputObjectSchema,
    StageUncheckedUpdateInputObjectSchema,
  ]),
});
