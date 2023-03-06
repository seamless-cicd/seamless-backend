import { z } from 'zod';
import { RunOrderByWithRelationInputObjectSchema } from './objects/RunOrderByWithRelationInput.schema';
import { RunWhereInputObjectSchema } from './objects/RunWhereInput.schema';
import { RunWhereUniqueInputObjectSchema } from './objects/RunWhereUniqueInput.schema';
import { RunScalarFieldEnumSchema } from './enums/RunScalarFieldEnum.schema';

export const RunFindManySchema = z.object({
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
  distinct: z.array(RunScalarFieldEnumSchema).optional(),
});
