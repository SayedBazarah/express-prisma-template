import express from 'express';
import session from 'express-session';
import passport from 'passport';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import authRoutes from './interfaces/routes/authRoutes';

const app = express();
const redisClient = createClient();

const sessionStore = new RedisStore({ client: redisClient });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: sessionStore,
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes());

export default app;