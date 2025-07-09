# Session Authentication DDD Application

This project implements session-based authentication using Express, Passport, and Redis as the session store, following Domain-Driven Design (DDD) principles.

## Project Structure

```
session-auth-ddd-app
├── src
│   ├── application
│   │   └── services
│   │       └── authService.ts
│   ├── domain
│   │   ├── models
│   │   │   └── user.ts
│   │   └── repositories
│   │       └── userRepository.ts
│   ├── infrastructure
│   │   ├── database
│   │   │   └── redisClient.ts
│   │   ├── passport
│   │   │   ├── index.ts
│   │   │   └── strategies
│   │   │       └── localStrategy.ts
│   │   └── repositories
│   │       └── userRepositoryImpl.ts
│   ├── interfaces
│   │   ├── controllers
│   │   │   └── authController.ts
│   │   └── routes
│   │       └── authRoutes.ts
│   ├── shared
│   │   └── types
│   │       └── express.d.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd session-auth-ddd-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Redis:**
   Ensure you have a Redis server running. You can use Docker to run Redis:
   ```bash
   docker run -p 6379:6379 -d redis
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

## Usage

- The application provides authentication routes for login, logout, and token refresh.
- Use the `/login` route to authenticate users with email and password.
- After successful login, access tokens and refresh tokens will be issued.
- Use the `/logout` route to terminate the session.
- Use the `/refresh-token` route to obtain a new access token using a valid refresh token.

## License

This project is licensed under the MIT License.