# Experiment 8.1 — Continuous Integration and Continuous Deployment

This folder contains a Spring Boot 3 application demonstrating automated testing, CI, Docker packaging, and a canary release workflow.

## Requirements
- Java JDK 17+
- Maven 3.9+
- Docker Desktop (required for Testcontainers and Docker Compose)
- Git and a GitHub account

## Run the application
From this folder:

```bash
mvn spring-boot:run
```

API endpoints:
- `GET /api/products`
- `GET /api/products/{id}`
- `POST /api/products` with JSON such as `{"name":"Keyboard","price":49.99}`

## Experiment 8.1A — Continuous Integration
Run all tests:

```bash
mvn clean verify
```

The test suite demonstrates:
- Unit testing with JUnit 5 and Mockito
- REST API integration testing with MockMvc
- Provider contract verification with Pact
- PostgreSQL integration testing with Testcontainers

The CI workflow template is stored at `.github/workflows/ci.yml` inside this experiment folder.

**Important GitHub Actions limitation:** GitHub only discovers workflow files under `.github/workflows` at the repository root. Since this experiment is nested in `Experiment 8.1`, this copy is a template and will not trigger automatically from here. To activate it, copy this file to the repository-root `.github/workflows/ci.yml` and adjust the workflow to run Maven with `working-directory: 'Experiment 8.1'` (or `cd 'Experiment 8.1'` in the run step).

## Experiment 8.1B — Continuous Deployment
Build and run locally:

```bash
docker build -t ci-cd-lab:local .
docker compose up --build
```

The CD workflow template builds and pushes a Docker image, deploys a canary container on a remote Docker host, and performs a smoke test. It is stored at `.github/workflows/cd.yml` inside this folder.

Before activating CD, configure these GitHub Actions secrets in the repository:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`

The remote host must have Docker and SSH access configured. The workflow stops after the canary smoke test; full traffic promotion depends on the reverse proxy/load balancer in the deployment environment.

## Push this folder to the existing repository
From Windows PowerShell, run:

```powershell
.\PUSH_TO_GITHUB.ps1
```

The script clones `MANINDERPAL1313/Full-Stack`, adds only this `Experiment 8.1` folder, commits, and pushes. It does not overwrite other repository files. GitHub authentication must already be configured through Git Credential Manager or another secure Git credential method.

Do not put GitHub passwords or personal access tokens in this folder or script.
