import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './objects/ServiceWhereUniqueInput.schema';

export const ServiceDeleteOneSchema = z.object({
  where: ServiceWhereUniqueInputObjectSchema,
});
