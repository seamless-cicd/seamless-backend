import { z } from 'zod';
import { PipelineOrderByWithRelationInputObjectSchema } from './objects/PipelineOrderByWithRelationInput.schema';
import { PipelineWhereInputObjectSchema } from './objects/PipelineWhereInput.schema';
import { PipelineWhereUniqueInputObjectSchema } from './objects/PipelineWhereUniqueInput.schema';
import { PipelineCountAggregateInputObjectSchema } from './objects/PipelineCountAggregateInput.schema';
import { PipelineMinAggregateInputObjectSchema } from './objects/PipelineMinAggregateInput.schema';
import { PipelineMaxAggregateInputObjectSchema } from './objects/PipelineMaxAggregateInput.schema';

export const PipelineAggregateSchema = z.object({
  orderBy: z
    .union([
      PipelineOrderByWithRelationInputObjectSchema,
      PipelineOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PipelineWhereInputObjectSchema.optional(),
  cursor: PipelineWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), PipelineCountAggregateInputObjectSchema])
    .optional(),
  _min: PipelineMinAggregateInputObjectSchema.optional(),
  _max: PipelineMaxAggregateInputObjectSchema.optional(),
});
