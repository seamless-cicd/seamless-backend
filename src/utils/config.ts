import dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  // Injected during CDK deployment
  AWS_ACCOUNT_ID: z.string(),
  AWS_REGION: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  BACKEND_PORT: z.string().optional(), // Defaults to 6379
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number).optional(), // Defaults to 6379
  // Unavailable during CDK deployment. Must be retrieved using AWS SDK.
  BACKEND_URL: z.string().optional(),
  WEBSOCKETS_API_URL: z.string().optional(),
  // Provide OAuth token if you want to use it as seed data.
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
  AWS_ACCOUNT_ID,
  AWS_REGION,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  BACKEND_PORT,
  DATABASE_URL,
  REDIS_HOST,
  REDIS_PORT,
  BACKEND_URL,
  WEBSOCKETS_API_URL,
  GITHUB_OAUTH_TOKEN,
} = parsedEnv.data;
