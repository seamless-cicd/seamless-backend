import { z } from 'zod';
import { PipelineOrderByWithRelationInputObjectSchema } from './objects/PipelineOrderByWithRelationInput.schema';
import { PipelineWhereInputObjectSchema } from './objects/PipelineWhereInput.schema';
import { PipelineWhereUniqueInputObjectSchema } from './objects/PipelineWhereUniqueInput.schema';
import { PipelineScalarFieldEnumSchema } from './enums/PipelineScalarFieldEnum.schema';

export const PipelineFindFirstSchema = z.object({
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
  distinct: z.array(PipelineScalarFieldEnumSchema).optional(),
});
