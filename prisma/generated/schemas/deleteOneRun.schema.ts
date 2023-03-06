import { z } from 'zod';
import { RunWhereUniqueInputObjectSchema } from './objects/RunWhereUniqueInput.schema';

export const RunDeleteOneSchema = z.object({
  where: RunWhereUniqueInputObjectSchema,
});
