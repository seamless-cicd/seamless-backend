import { z } from 'zod';
import { PipelineCreateManyInputObjectSchema } from './objects/PipelineCreateManyInput.schema';

export const PipelineCreateManySchema = z.object({
  data: z.union([
    PipelineCreateManyInputObjectSchema,
    z.array(PipelineCreateManyInputObjectSchema),
  ]),
});
