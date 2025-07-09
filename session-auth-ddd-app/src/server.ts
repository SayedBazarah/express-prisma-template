import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import { authRoutes } from './interfaces/routes/authRoutes';

const app = express();
const RedisStore = connectRedis(session);
const redisClient = createClient();

redisClient.connect().catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});