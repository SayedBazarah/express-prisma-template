import express from 'express';
import session from 'express-session';
import passport from 'passport';
import connectRedis from 'connect-redis';
import { redisClient } from '../database/redisClient';

const RedisStore = connectRedis(session);

const initializePassport = (app: express.Application) => {
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your_secret_key', // Replace with your actual secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};

export default initializePassport;