import { z } from 'zod';
import { RunWhereInputObjectSchema } from './objects/RunWhereInput.schema';
import { RunOrderByWithAggregationInputObjectSchema } from './objects/RunOrderByWithAggregationInput.schema';
import { RunScalarWhereWithAggregatesInputObjectSchema } from './objects/RunScalarWhereWithAggregatesInput.schema';
import { RunScalarFieldEnumSchema } from './enums/RunScalarFieldEnum.schema';

export const RunGroupBySchema = z.object({
  where: RunWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      RunOrderByWithAggregationInputObjectSchema,
      RunOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: RunScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(RunScalarFieldEnumSchema),
});
