import { z } from 'zod';
import { PipelineWhereUniqueInputObjectSchema } from './objects/PipelineWhereUniqueInput.schema';
import { PipelineCreateInputObjectSchema } from './objects/PipelineCreateInput.schema';
import { PipelineUncheckedCreateInputObjectSchema } from './objects/PipelineUncheckedCreateInput.schema';
import { PipelineUpdateInputObjectSchema } from './objects/PipelineUpdateInput.schema';
import { PipelineUncheckedUpdateInputObjectSchema } from './objects/PipelineUncheckedUpdateInput.schema';

export const PipelineUpsertSchema = z.object({
  where: PipelineWhereUniqueInputObjectSchema,
  create: z.union([
    PipelineCreateInputObjectSchema,
    PipelineUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    PipelineUpdateInputObjectSchema,
    PipelineUncheckedUpdateInputObjectSchema,
  ]),
});
