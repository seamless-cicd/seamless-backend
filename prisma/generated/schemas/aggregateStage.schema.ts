import { z } from 'zod';
import { StageOrderByWithRelationInputObjectSchema } from './objects/StageOrderByWithRelationInput.schema';
import { StageWhereInputObjectSchema } from './objects/StageWhereInput.schema';
import { StageWhereUniqueInputObjectSchema } from './objects/StageWhereUniqueInput.schema';
import { StageCountAggregateInputObjectSchema } from './objects/StageCountAggregateInput.schema';
import { StageMinAggregateInputObjectSchema } from './objects/StageMinAggregateInput.schema';
import { StageMaxAggregateInputObjectSchema } from './objects/StageMaxAggregateInput.schema';
import { StageAvgAggregateInputObjectSchema } from './objects/StageAvgAggregateInput.schema';
import { StageSumAggregateInputObjectSchema } from './objects/StageSumAggregateInput.schema';

export const StageAggregateSchema = z.object({
  orderBy: z
    .union([
      StageOrderByWithRelationInputObjectSchema,
      StageOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: StageWhereInputObjectSchema.optional(),
  cursor: StageWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), StageCountAggregateInputObjectSchema])
    .optional(),
  _min: StageMinAggregateInputObjectSchema.optional(),
  _max: StageMaxAggregateInputObjectSchema.optional(),
  _avg: StageAvgAggregateInputObjectSchema.optional(),
  _sum: StageSumAggregateInputObjectSchema.optional(),
});
