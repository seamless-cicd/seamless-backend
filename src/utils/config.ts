import dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  BACKEND_PORT: z.string(),
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  AWS_ACCOUNT_ID: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_PAT: z.string(),
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
  BACKEND_PORT,
  DATABASE_URL,
  REDIS_HOST,
  REDIS_PORT,
  AWS_ACCOUNT_ID,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_PAT,
} = parsedEnv.data;
