import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().optional(),
  SESSION_SECRET: z.string().default("secret"),
  ACCESS_SECRET: z.string().default("secret"),
  REFRESH_SECRET: z.string().default("secret"),
  ACCESS_EXPIRES_IN: z.coerce.number().default(10 * 60 * 1000),
  REFRESH_EXPIRES_IN: z.coerce.number().default(7 * 24 * 60 * 60 * 1000),
});

try {
  // eslint-disable-next-line node/no-process-env
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      "Missing environment variables:",
      error.issues.flatMap((issue) => issue.path)
    );
  } else {
    console.error(error);
  }
  process.exit(1);
}

// eslint-disable-next-line node/no-process-env
export const env = envSchema.parse(process.env);
