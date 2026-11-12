# Experiment 9.1 — Full-Stack Social Media Management System

A teaching-ready full-stack starter that integrates a React + Redux Toolkit frontend with a Spring Boot REST API, PostgreSQL persistence, JWT authentication, role-aware endpoints, post scheduling, analytics, and Kafka event publishing.

## Features
- React dashboard, post composer, post list, scheduling form, and analytics summary.
- Redux Toolkit state management and Axios API client.
- Spring Boot REST API with JWT bearer authentication and `ADMIN` / `USER` roles.
- PostgreSQL persistence using Spring Data JPA.
- Scheduled-post polling that publishes `PostPublishRequested` events to Kafka.
- OpenAPI/Swagger UI and Docker Compose development environment.
- GitHub Actions workflow for backend tests and frontend build.

> This is an educational baseline, not a production-certified service. Before public deployment, use a secret manager, HTTPS, refresh-token rotation, rate limiting, audit logging, migrations (Flyway/Liquibase), proper Kafka consumer/provider integration, and externalized environment-specific configuration. The scheduled publisher emits Kafka events; a platform-specific social-network publishing adapter is intentionally left as an integration point.

## Requirements
- JDK 17+
- Node.js 20+
- Docker Desktop with Compose
- Git

## Run locally
1. Start infrastructure from this directory:
   ```bash
   docker compose up -d postgres zookeeper kafka
   ```
2. Start backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   API: `http://localhost:8080` · Swagger: `http://localhost:8080/swagger-ui.html`
3. In another terminal, start frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   UI: `http://localhost:5173`

Default demo user is created at startup: `demo@example.com` / `Password123!`. Change this immediately outside local coursework. Set `JWT_SECRET` to a long random value in non-local environments.

## API quick reference
- `POST /api/auth/login` — `{ "email": "demo@example.com", "password": "Password123!" }`
- `GET /api/posts` — list current user's posts (Bearer token)
- `POST /api/posts` — create post `{ "content": "Hello", "scheduledAt": "2027-01-01T10:00:00" }`
- `GET /api/analytics/summary` — counts by status

## Test
```bash
cd backend && mvn test
cd ../frontend && npm test -- --run
```

## Docker
`docker compose up --build` starts PostgreSQL, Zookeeper, Kafka, backend, and frontend. Frontend is exposed on 5173; backend on 8080.

## CI/CD
`.github/workflows/ci.yml` runs Maven tests and the frontend build on pushes and pull requests. Add deployment credentials as GitHub Actions secrets and extend the workflow for your selected host (Render/AWS/etc.). Canary rollout requires infrastructure support at the chosen deployment platform; document and configure traffic splitting there rather than pretending a generic workflow can enable it.

## Suggested experiment demonstration
1. Log in using the demo credentials.
2. Create a post and set a future schedule time.
3. Confirm it appears in the post list.
4. View analytics summary.
5. Open Swagger and demonstrate authenticated REST calls.
6. Inspect Kafka topic `post-publish-events` when a scheduled post becomes due.
7. Push a change to GitHub and show the Actions workflow run.
