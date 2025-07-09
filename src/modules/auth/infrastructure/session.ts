import session from "express-session";
import { RedisStore } from "connect-redis";

import { env } from "@/env";
import { createClient } from "redis";

import passport from "./";

// Initialize client.
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "auth:",
});

export const sessionMiddleware = session({
  store: redisStore,
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // use true if HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

export const initializePassport = [passport.initialize(), passport.session()];
