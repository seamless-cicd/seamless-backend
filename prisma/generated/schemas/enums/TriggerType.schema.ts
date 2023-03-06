import { z } from 'zod';

export const TriggerTypeSchema = z.enum(['MAIN', 'PR_OPEN', 'PR_SYNC']);
