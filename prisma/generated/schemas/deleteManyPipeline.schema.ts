import { z } from 'zod';
import { PipelineWhereInputObjectSchema } from './objects/PipelineWhereInput.schema';

export const PipelineDeleteManySchema = z.object({
  where: PipelineWhereInputObjectSchema.optional(),
});
