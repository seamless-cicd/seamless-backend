import { z } from 'zod';
import { PipelineCreateInputObjectSchema } from './objects/PipelineCreateInput.schema';
import { PipelineUncheckedCreateInputObjectSchema } from './objects/PipelineUncheckedCreateInput.schema';

export const PipelineCreateOneSchema = z.object({
  data: z.union([
    PipelineCreateInputObjectSchema,
    PipelineUncheckedCreateInputObjectSchema,
  ]),
});
