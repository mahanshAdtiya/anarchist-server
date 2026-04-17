# Anarchist Server

A NestJS-based backend for an e-commerce platform with user authentication, product management, order processing, and promotional features.

## Tech Stack

- **Framework**: NestJS 11 (Node.js / TypeScript)
- **Database**: PostgreSQL 18 (via Docker)
- **ORM**: Prisma 7
- **Auth**: JWT + Google OAuth (Passport.js)
- **Hashing**: Argon2

## Prerequisites

- Node.js
- pnpm
- Docker

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
PORT=8080
NODE_ENV=development

DATABASE_URL=postgresql://postgres:localdb@localhost:5434/anarchist

JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Start the database

```bash
pnpm db:dev:up
```

### 4. Run Prisma migrations

```bash
pnpm prisma:dev:deploy
```

### 5. Start the development server

```bash
pnpm dev
```

The server runs at `http://localhost:8080` by default.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start with hot-reload |
| `pnpm build` | Compile TypeScript |
| `pnpm start:prod` | Run compiled output |
| `pnpm db:dev:up` | Start PostgreSQL Docker container |
| `pnpm db:dev:rm` | Remove Docker container |
| `pnpm db:dev:restart` | Full database restart |
| `pnpm prisma:dev:deploy` | Deploy Prisma migrations |
| `pnpm create-admin` | Create an admin user |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm test:cov` | Run tests with coverage |
| `pnpm lint` | Lint and auto-fix |
| `pnpm format` | Format with Prettier |

## Project Structure

```
src/
├── auth/           # JWT & Google OAuth authentication
├── user/           # User management
├── product/        # Product catalog
├── category/       # Product categories
├── color/          # Color variants
├── size/           # Size variants
├── billboard/      # Marketing billboards
├── orders/         # Order management
├── prisma/         # Prisma service
└── utils/          # Interceptors, filters, middleware

prisma/
├── schema.prisma   # Database schema
└── prisma.config.ts
```

## Database

PostgreSQL runs in Docker on port **5434**.

```
service:     anarchist-db
image:       postgres:18
port:        5434 → 5432
volume:      anarchist_db_data
credentials: postgres / localdb
```

## API

- Global validation pipe (strips unknown fields via whitelist mode)
- Standardized response format via `ResponseInterceptor`
- Centralized error handling via `GlobalExceptionFilter`
- Request logging via `LoggerMiddleware`
- CORS enabled for all origins
