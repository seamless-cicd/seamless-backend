import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './objects/RunWhereUniqueInput.schema';

export const RunFindUniqueSchema = z.object({
  where: RunWhereUniqueInputObjectSchema,
});
