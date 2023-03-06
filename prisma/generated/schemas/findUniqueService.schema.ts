import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './objects/ServiceWhereUniqueInput.schema';

export const ServiceFindUniqueSchema = z.object({
  where: ServiceWhereUniqueInputObjectSchema,
});
