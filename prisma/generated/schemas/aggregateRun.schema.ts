import { z } from 'zod';
import { RunOrderByWithRelationInputObjectSchema } from './objects/RunOrderByWithRelationInput.schema';
import { RunWhereInputObjectSchema } from './objects/RunWhereInput.schema';
import { RunWhereUniqueInputObjectSchema } from './objects/RunWhereUniqueInput.schema';
import { RunCountAggregateInputObjectSchema } from './objects/RunCountAggregateInput.schema';
import { RunMinAggregateInputObjectSchema } from './objects/RunMinAggregateInput.schema';
import { RunMaxAggregateInputObjectSchema } from './objects/RunMaxAggregateInput.schema';
import { RunAvgAggregateInputObjectSchema } from './objects/RunAvgAggregateInput.schema';
import { RunSumAggregateInputObjectSchema } from './objects/RunSumAggregateInput.schema';

export const RunAggregateSchema = z.object({
  orderBy: z
    .union([
      RunOrderByWithRelationInputObjectSchema,
      RunOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RunWhereInputObjectSchema.optional(),
  cursor: RunWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), RunCountAggregateInputObjectSchema])
    .optional(),
  _min: RunMinAggregateInputObjectSchema.optional(),
  _max: RunMaxAggregateInputObjectSchema.optional(),
  _avg: RunAvgAggregateInputObjectSchema.optional(),
  _sum: RunSumAggregateInputObjectSchema.optional(),
});
