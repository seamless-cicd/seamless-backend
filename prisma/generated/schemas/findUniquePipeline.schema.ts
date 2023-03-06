import { z } from 'zod';
import { PipelineWhereUniqueInputObjectSchema } from './objects/PipelineWhereUniqueInput.schema';

export const PipelineFindUniqueSchema = z.object({
  where: PipelineWhereUniqueInputObjectSchema,
});
