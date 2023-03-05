import { z } from 'zod';
import { StageWhereUniqueInputObjectSchema } from './objects/StageWhereUniqueInput.schema';

export const StageFindUniqueSchema = z.object({
  where: StageWhereUniqueInputObjectSchema,
});
