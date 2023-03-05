import { z } from 'zod';
import { PipelineWhereUniqueInputObjectSchema } from './objects/PipelineWhereUniqueInput.schema';

export const PipelineDeleteOneSchema = z.object({
  where: PipelineWhereUniqueInputObjectSchema,
});
