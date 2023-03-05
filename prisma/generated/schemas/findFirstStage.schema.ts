import { z } from 'zod';
import { StageOrderByWithRelationInputObjectSchema } from './objects/StageOrderByWithRelationInput.schema';
import { StageWhereInputObjectSchema } from './objects/StageWhereInput.schema';
import { StageWhereUniqueInputObjectSchema } from './objects/StageWhereUniqueInput.schema';
import { StageScalarFieldEnumSchema } from './enums/StageScalarFieldEnum.schema';

export const StageFindFirstSchema = z.object({
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
  distinct: z.array(StageScalarFieldEnumSchema).optional(),
});
