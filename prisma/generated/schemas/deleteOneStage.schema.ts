import { z } from 'zod';
import { StageWhereUniqueInputObjectSchema } from './objects/StageWhereUniqueInput.schema';

export const StageDeleteOneSchema = z.object({
  where: StageWhereUniqueInputObjectSchema,
});
