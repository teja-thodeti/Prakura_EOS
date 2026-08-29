# ExpenseOS Backend

Production-style REST API for the Prakura ExpenseOS frontend, built with **Node.js, Express, TypeScript, and MongoDB (Mongoose)**.

## Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose (schemas, indexes, refs, transactions/sessions)
- JWT access + refresh tokens (rotation on refresh)
- bcryptjs password hashing
- zod request validation
- helmet, cors, express-rate-limit, morgan

## Getting started

```bash
cd backend
cp .env.example .env       # fill in real secrets for production
npm install
npm run seed                # optional: creates demo user + sample data
npm run dev                 # starts on http://localhost:5000
```

Demo login after seeding: `demo@prakura.app` / `Demo@1234`

Build for production:

```bash
npm run build
npm start
```

## Environment variables (.env)

| Variable | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `NODE_ENV` | development / production |
| `CLIENT_URL` | Frontend origin allowed by CORS |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `JWT_ACCESS_EXPIRES_IN` | e.g. `15m` |
| `JWT_REFRESH_EXPIRES_IN` | e.g. `30d` |
| `OTP_EXPIRES_MIN` | Password-reset OTP validity window |
| `BCRYPT_SALT_ROUNDS` | bcrypt cost factor |

Never commit `.env`. All secrets are read from environment variables — nothing is hardcoded.

## Data model

Every user-owned document (`Account`, `Transaction`, `Budget`, `Bill`, `Subscription`, `Payment`, `Invoice`, `UserProfile`, `Session`, `RefreshToken`, `OTP`, `TrustedDevice`) stores a `user` reference and every query/mutation is scoped with `{ user: req.user.id }`, so one user can never read or modify another user's data.

Financial mutations that touch more than one document — creating/editing/deleting a transaction (which must also update account balances), transferring between accounts, and paying a bill — run inside a **Mongoose/MongoDB session with `withTransaction`**, so a partial failure can never leave balances and transaction history out of sync.

See `API_DOCUMENTATION.md` for the full endpoint reference.

## Project layout

```
src/
  config/       env + MongoDB connection
  models/       Mongoose schemas (16 models)
  types/        shared TS types
  utils/        jwt, response helpers, asyncHandler, otp
  middleware/   auth (JWT), error handler, zod validate
  controllers/  business logic per domain
  routes/       Express routers, mounted under /api
  seed/         seed.ts — demo data for local development
  app.ts        Express app (middleware + routes)
  server.ts     entrypoint — connects DB, starts HTTP server
```
