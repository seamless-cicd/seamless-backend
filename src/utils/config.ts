import dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

// Most of these are injected into Backend container when deploying infrastructure via AWS CDK
const envSchema = z.object({
  BACKEND_PORT: z.string().optional(),
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number).optional(), // Defaults to 6379
  AWS_ACCOUNT_ID: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  // Unavailable during CDK deploy. Must be retrieved using AWS SDK during setup.
  WEBSOCKETS_API_URL: z.string().optional(),
  // Unavailable during CDK deploy. Must be retrieved using AWS SDK during setup.
  BACKEND_URL: z.string().optional(),
  // Unavailable during CDK deploy. Provide here if you want to use it as seed data.
  GITHUB_OAUTH_TOKEN: z.string().optional(),
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
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  WEBSOCKETS_API_URL,
  BACKEND_URL,
  GITHUB_OAUTH_TOKEN,
} = parsedEnv.data;
