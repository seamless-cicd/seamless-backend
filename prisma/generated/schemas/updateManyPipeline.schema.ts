import { z } from 'zod';
import { PipelineUpdateManyMutationInputObjectSchema } from './objects/PipelineUpdateManyMutationInput.schema';
import { PipelineWhereInputObjectSchema } from './objects/PipelineWhereInput.schema';

export const PipelineUpdateManySchema = z.object({
  data: PipelineUpdateManyMutationInputObjectSchema,
  where: PipelineWhereInputObjectSchema.optional(),
});
