import { z } from 'zod';
import { PipelineUpdateInputObjectSchema } from './objects/PipelineUpdateInput.schema';
import { PipelineUncheckedUpdateInputObjectSchema } from './objects/PipelineUncheckedUpdateInput.schema';
import { PipelineWhereUniqueInputObjectSchema } from './objects/PipelineWhereUniqueInput.schema';

export const PipelineUpdateOneSchema = z.object({
  data: z.union([
    PipelineUpdateInputObjectSchema,
    PipelineUncheckedUpdateInputObjectSchema,
  ]),
  where: PipelineWhereUniqueInputObjectSchema,
});
