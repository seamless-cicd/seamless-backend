import { z } from 'zod';
import { PipelineWhereInputObjectSchema } from './objects/PipelineWhereInput.schema';
import { PipelineOrderByWithAggregationInputObjectSchema } from './objects/PipelineOrderByWithAggregationInput.schema';
import { PipelineScalarWhereWithAggregatesInputObjectSchema } from './objects/PipelineScalarWhereWithAggregatesInput.schema';
import { PipelineScalarFieldEnumSchema } from './enums/PipelineScalarFieldEnum.schema';

export const PipelineGroupBySchema = z.object({
  where: PipelineWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PipelineOrderByWithAggregationInputObjectSchema,
      PipelineOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: PipelineScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(PipelineScalarFieldEnumSchema),
});
