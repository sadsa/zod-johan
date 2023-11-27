import { z } from 'zod';
import { zBoolean, zNumber } from '~/utils/zod';

export const serverEnvSchema = z.object({
  /**
   * The following env variables are built-in to the docker image.
   */
  NODE_ENV: z.enum(['production', 'development', 'test']).optional(),
  VERSION: z.string().optional(),

  /**
   * Please add environment variables below.
   */
  HOST: z.string().min(1, 'HOST environment variable must be set'),
  ENV: z.enum(['prod', 'qa', 'dev', 'local-dev']),
  LOG_LEVEL: z
    .enum(['silly', 'debug', 'verbose', 'info', 'warn', 'error', 'http'])
    .optional(),

  SESSION_SECRET: z.string().min(1, {
    message: 'SESSION_SECRET environment variable must be set',
  }),

  db__host: z
    .string()
    .min(1, { message: 'db__host environment variable must be set' }),
  db__port: z
    .string()
    .min(1, { message: 'db__port environment variable must be set' }),
  db__username: z
    .string()
    .min(1, { message: 'db__username environment variable must be set' }),
  db__password: z
    .string()
    .min(1, { message: 'db__password environment variable must be set' }),
  db__database: z
    .string()
    .min(1, { message: 'db__database environment variable must be set' }),

  AUTH_CLIENT_ID: z
    .string()
    .min(1, { message: 'AUTH_CLIENT_ID environment variable must be set' }),
  AUTH_CLIENT_SECRET: z.string().min(1, {
    message: 'AUTH_CLIENT_SECRET environment variable must be set',
  }),
  AUTH_DOMAIN: z
    .string()
    .min(1, { message: 'AUTH_CLIENT_ID environment variable must be set' }),
  AUTH_AUDIENCE: z.string().optional(),

  Sentry__Enabled: zBoolean().optional(),
  Sentry__Dsn: z.string().optional(),
  Sentry__Environment: z.string().optional(),
  Sentry__TracesSampleRate: zNumber().optional(),

  MAPBOX_ACCESS_TOKEN: z.string().min(1, {
    message: 'MAPBOX_ACCESS_TOKEN environment variable must be set',
  }),

  APOLLO_API_ENDPOINT: z.string().min(1, {
    message: 'APOLLO_API_ENDPOINT environment variable must be set',
  }),
  APOLLO_GRAPHQL_ENDPOINT: z.string().min(1, {
    message: 'APOLLO_GRAPHQL_ENDPOINT environment variable must be set',
  }),
});

export type ServerEnv = z.infer<typeof clientEnvSchema>;

export const clientEnvSchema = serverEnvSchema.pick({
  NODE_ENV: true,
  VERSION: true,
  ENV: true,
  HOST: true,
  MAPBOX_ACCESS_TOKEN: true,
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
