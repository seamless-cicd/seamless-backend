import { z } from 'zod';
import { StageUpdateInputObjectSchema } from './objects/StageUpdateInput.schema';
import { StageUncheckedUpdateInputObjectSchema } from './objects/StageUncheckedUpdateInput.schema';
import { StageWhereUniqueInputObjectSchema } from './objects/StageWhereUniqueInput.schema';

export const StageUpdateOneSchema = z.object({
  data: z.union([
    StageUpdateInputObjectSchema,
    StageUncheckedUpdateInputObjectSchema,
  ]),
  where: StageWhereUniqueInputObjectSchema,
});
