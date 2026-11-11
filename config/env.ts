import dotenv from 'dotenv';
import { z } from 'zod';

// Only local developers read .env files; CI injects secrets via protected variables.
const target = process.env.TEST_ENV ?? 'dev';
if (!process.env.CI) dotenv.config({ path: `.env.${target}` });

const schema = z.object({
  TEST_ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  UI_BASE_URL: z.url(),
  API_BASE_URL: z.url(),
  API_TOKEN: z.string().optional(),
  TEST_USERNAME: z.string().optional(),
  TEST_PASSWORD: z.string().optional(),
  ALLOW_PROD_WRITE: z.enum(['true', 'false']).default('false'),
});

const defaults = {
  dev: { UI_BASE_URL: 'https://dev.example.com', API_BASE_URL: 'https://api.dev.example.com' },
  staging: { UI_BASE_URL: 'https://staging.example.com', API_BASE_URL: 'https://api.staging.example.com' },
  prod: { UI_BASE_URL: 'https://www.example.com', API_BASE_URL: 'https://api.example.com' },
} as const;
if (!(target in defaults)) throw new Error(`Invalid TEST_ENV: ${target}`);
const values = schema.parse({ ...defaults[target as keyof typeof defaults], ...process.env });
export const env = {
  name: values.TEST_ENV,
  uiBaseURL: values.UI_BASE_URL,
  apiBaseURL: values.API_BASE_URL,
  apiToken: values.API_TOKEN,
  username: values.TEST_USERNAME,
  password: values.TEST_PASSWORD,
  allowProdWrite: values.ALLOW_PROD_WRITE === 'true',
} as const;
