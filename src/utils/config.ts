import dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  API_KEY: z.string(),
  GET_LAMBDA: z.string(),
  SET_LAMBDA: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export type EnvVars = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    JSON.stringify(parsedEnv.error.format()),
  );
  process.exit(1);
}

export const {
  REDIS_HOST,
  REDIS_PORT,
  API_KEY,
  GET_LAMBDA,
  SET_LAMBDA,
  GITHUB_CLIENT_SECRET,
} = parsedEnv.data;
