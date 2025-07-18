---
title: "DevOps para Desenvolvedores Frontend: Docker e CI/CD"
excerpt: "Guia completo de DevOps para frontend: Docker, CI/CD, deployment automatizado, monitoramento e boas práticas. Do desenvolvimento à produção de forma profissional e eficiente."
date: "2025-01-11"
category: "DevOps"
tags: ["devops", "docker", "ci/cd", "deployment", "frontend", "automação"]
featured: true
image: "/static/posts/devops-para-desenvolvedores-frontend-docker-e-cicd.jpg"
author: "Gabriel Mesquita"
readTime: 20
seo:
  metaTitle: "DevOps para Frontend: Docker, CI/CD e Deployment Automatizado"
  metaDescription: "Aprenda DevOps para frontend: Docker, pipelines CI/CD, deployment automatizado, monitoramento e infraestrutura como código. Guia completo e prático."
  keywords:
    [
      "DevOps frontend",
      "Docker",
      "CI/CD",
      "deployment",
      "automação",
      "infraestrutura",
      "GitHub Actions",
      "Vercel",
    ]
---

# DevOps para Desenvolvedores Frontend: Docker e CI/CD

O DevOps transformou a forma como desenvolvemos e entregamos software. Para desenvolvedores frontend, dominar essas práticas é essencial para criar pipelines eficientes e deploys confiáveis. Este guia abrangente cobre tudo que você precisa saber.

## 🎯 Por que DevOps para Frontend?

### Benefícios Principais

- **Deploys automáticos** e seguros
- **Ambientes consistentes** entre dev, staging e produção
- **Rollbacks rápidos** em caso de problemas
- **Monitoramento proativo** de performance
- **Colaboração eficiente** entre equipes

```bash
# Exemplo: Pipeline tradicional vs DevOps
# Tradicional:
npm run build
scp -r dist/ user@server:/var/www/html
# ❌ Manual, propenso a erros, sem rollback

# DevOps:
git push origin main
# ✅ Automático, testado, com rollback
```

## 🐳 Docker para Frontend

### 1. Dockerfile Otimizado

```dockerfile
# Dockerfile multi-stage para React/Next.js
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Install dependencies based on package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build arguments
ARG NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["node", "server.js"]
```

### 2. Docker Compose para Desenvolvimento

```yaml
# docker-compose.yml
version: "3.8"

services:
  # Frontend application
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
      args:
        - NODE_ENV=development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - WATCHPACK_POLLING=true
    depends_on:
      - api
      - redis
    networks:
      - app-network

  # API backend (exemplo)
  api:
    image: node:18-alpine
    working_dir: /app
    command: npm run dev
    ports:
      - "8000:8000"
    volumes:
      - ../backend:/app
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@postgres:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    networks:
      - app-network

  # Database
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  # Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - frontend
      - api
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### 3. Dockerfile para Desenvolvimento

```dockerfile
# Dockerfile.dev - Otimizado para desenvolvimento
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Create .next directory with proper permissions
RUN mkdir .next && chown -R node:node .next

# Switch to non-root user
USER node

# Expose port
EXPOSE 3000

# Development command with hot reload
CMD ["npm", "run", "dev"]
```

### 4. Scripts Docker Úteis

```bash
#!/bin/bash
# scripts/docker-dev.sh

# Build and start development environment
echo "🚀 Starting development environment..."

# Stop any running containers
docker-compose down

# Build images
docker-compose build

# Start services
docker-compose up -d

# Show logs
echo "📋 Container logs:"
docker-compose logs -f frontend

# Health check
echo "🏥 Health check:"
curl -f http://localhost:3000/api/health || echo "❌ Health check failed"

echo "✅ Development environment is ready!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 API: http://localhost:8000"
echo "💾 Database: localhost:5432"
```

```bash
#!/bin/bash
# scripts/docker-build.sh

# Production build script
set -e

echo "🏗️  Building production image..."

# Build arguments
NODE_ENV="production"
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://api.myapp.com}"
NEXT_PUBLIC_APP_URL="${NEXT_PUBLIC_APP_URL:-https://myapp.com}"

# Build image
docker build \
  --build-arg NODE_ENV=$NODE_ENV \
  --build-arg NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
  --build-arg NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
  -t myapp:latest \
  -t myapp:$(git rev-parse --short HEAD) \
  .

echo "✅ Build completed!"
echo "🏷️  Tags: myapp:latest, myapp:$(git rev-parse --short HEAD)"

# Test image
echo "🧪 Testing image..."
docker run --rm -d -p 3001:3000 --name myapp-test myapp:latest

sleep 5

if curl -f http://localhost:3001/api/health; then
  echo "✅ Health check passed!"
else
  echo "❌ Health check failed!"
  exit 1
fi

docker stop myapp-test
echo "🎉 Image is ready for deployment!"
```

## 🔄 CI/CD Pipelines

### 1. GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "18"
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Test job
  test:
    name: Run Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BROWSERS_PATH: ${{ github.workspace }}/pw-browsers

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/

  # Build job
  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: test

    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
      image-digest: ${{ steps.build.outputs.digest }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            NODE_ENV=production
            NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
            NEXT_PUBLIC_APP_URL=${{ secrets.NEXT_PUBLIC_APP_URL }}

  # Deploy to staging
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'

    environment:
      name: staging
      url: https://staging.myapp.com

    steps:
      - name: Deploy to staging
        run: |
          echo "🚀 Deploying to staging..."
          # Deploy logic here (Kubernetes, Docker Swarm, etc.)

      - name: Run smoke tests
        run: |
          echo "🧪 Running smoke tests..."
          curl -f https://staging.myapp.com/api/health

  # Deploy to production
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build, deploy-staging]
    if: github.ref == 'refs/heads/main'

    environment:
      name: production
      url: https://myapp.com

    steps:
      - name: Deploy to production
        run: |
          echo "🚀 Deploying to production..."
          # Production deployment logic

      - name: Notify deployment
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.repos.createDeploymentStatus({
              owner: context.repo.owner,
              repo: context.repo.repo,
              deployment_id: context.payload.deployment.id,
              state: 'success',
              environment_url: 'https://myapp.com',
              description: 'Deployment completed successfully'
            });

  # Performance testing
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: deploy-staging
    if: github.event_name == 'pull_request'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: "./lighthouserc.js"
          uploadArtifacts: true
          temporaryPublicStorage: true
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 2. GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy-staging
  - deploy-production

variables:
  NODE_VERSION: "18"
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

# Test stage
test:unit:
  stage: test
  image: node:${NODE_VERSION}-alpine
  cache:
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run lint
    - npm run test:unit
    - npm run test:e2e
  artifacts:
    reports:
      junit: test-results/junit.xml
      coverage: coverage/lcov.info
    paths:
      - coverage/
    expire_in: 30 days
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

# Build stage
build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  variables:
    IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  script:
    - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
    - docker build
      --build-arg NODE_ENV=production
      --build-arg NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
      --build-arg NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
      -t $IMAGE_TAG .
    - docker push $IMAGE_TAG
  only:
    - main
    - develop

# Deploy to staging
deploy:staging:
  stage: deploy-staging
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to staging..."
    - |
      curl -X POST \
        -H "Authorization: Bearer $STAGING_DEPLOY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"image\":\"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\"}" \
        $STAGING_WEBHOOK_URL
    - sleep 30
    - curl -f https://staging.myapp.com/api/health
  environment:
    name: staging
    url: https://staging.myapp.com
  only:
    - main

# Deploy to production
deploy:production:
  stage: deploy-production
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to production..."
    - |
      curl -X POST \
        -H "Authorization: Bearer $PRODUCTION_DEPLOY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"image\":\"$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\"}" \
        $PRODUCTION_WEBHOOK_URL
    - sleep 30
    - curl -f https://myapp.com/api/health
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - main
```

### 3. Pipeline de Testes

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/test/**",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// playwright.config.js
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["junit", { outputFile: "test-results/junit.xml" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

## 🌐 Deployment Strategies

### 1. Blue-Green Deployment

```bash
#!/bin/bash
# scripts/blue-green-deploy.sh

set -e

CURRENT_COLOR=$(curl -s https://myapp.com/api/version | jq -r '.color' || echo "blue")
NEW_COLOR=$([ "$CURRENT_COLOR" = "blue" ] && echo "green" || echo "blue")
NEW_IMAGE="myapp:$(git rev-parse --short HEAD)"

echo "🔄 Current environment: $CURRENT_COLOR"
echo "🆕 Deploying to: $NEW_COLOR"
echo "🏷️  Image: $NEW_IMAGE"

# Deploy to inactive environment
echo "🚀 Deploying to $NEW_COLOR environment..."
docker service update \
  --image $NEW_IMAGE \
  --update-delay 10s \
  --update-parallelism 1 \
  myapp-$NEW_COLOR

# Wait for deployment
echo "⏳ Waiting for deployment to complete..."
sleep 30

# Health check
echo "🏥 Running health checks..."
for i in {1..10}; do
  if curl -f "https://$NEW_COLOR.myapp.com/api/health"; then
    echo "✅ Health check passed!"
    break
  fi

  if [ $i -eq 10 ]; then
    echo "❌ Health check failed after 10 attempts"
    exit 1
  fi

  echo "⏳ Attempt $i failed, retrying in 10s..."
  sleep 10
done

# Run smoke tests
echo "🧪 Running smoke tests..."
npm run test:smoke -- --base-url="https://$NEW_COLOR.myapp.com"

# Switch traffic
echo "🔀 Switching traffic to $NEW_COLOR..."
kubectl patch service myapp-service -p '{"spec":{"selector":{"version":"'$NEW_COLOR'"}}}'

# Final health check
echo "🏥 Final health check..."
sleep 10
curl -f https://myapp.com/api/health

echo "✅ Deployment completed successfully!"
echo "🎉 New environment ($NEW_COLOR) is now live!"
```

### 2. Rolling Updates com Kubernetes

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-frontend
  labels:
    app: myapp-frontend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: myapp-frontend
  template:
    metadata:
      labels:
        app: myapp-frontend
    spec:
      containers:
        - name: frontend
          image: myapp:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
            - name: NEXT_PUBLIC_API_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: api-url
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 15"]

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-frontend-service
spec:
  selector:
    app: myapp-frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-frontend-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
    - hosts:
        - myapp.com
      secretName: myapp-tls
  rules:
    - host: myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-frontend-service
                port:
                  number: 80
```

### 3. Canary Deployment

```yaml
# k8s/canary-deployment.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp-frontend-rollout
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        - setWeight: 20 # 20% traffic to new version
        - pause: { duration: 2m }
        - setWeight: 40 # 40% traffic
        - pause: { duration: 5m }
        - setWeight: 60 # 60% traffic
        - pause: { duration: 5m }
        - setWeight: 80 # 80% traffic
        - pause: { duration: 5m }
      # 100% traffic (automatic)

      canaryService: myapp-frontend-canary
      stableService: myapp-frontend-stable

      analysis:
        templates:
          - templateName: success-rate
        args:
          - name: service-name
            value: myapp-frontend-canary

  selector:
    matchLabels:
      app: myapp-frontend
  template:
    metadata:
      labels:
        app: myapp-frontend
    spec:
      containers:
        - name: frontend
          image: myapp:latest
          ports:
            - containerPort: 3000

---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
    - name: service-name
  metrics:
    - name: success-rate
      interval: 2m
      successCondition: result[0] >= 0.95
      failureLimit: 3
      provider:
        prometheus:
          address: http://prometheus.monitoring.svc.cluster.local:9090
          query: |
            sum(rate(http_requests_total{service="{{args.service-name}}",status!~"5.."}[2m])) /
            sum(rate(http_requests_total{service="{{args.service-name}}"}[2m]))
```

## 📊 Monitoramento e Observabilidade

### 1. Health Checks

```javascript
// src/pages/api/health.js
export default async function handler(req, res) {
  const healthChecks = {
    timestamp: new Date().toISOString(),
    status: "healthy",
    version: process.env.APP_VERSION || "unknown",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    checks: {},
  };

  try {
    // Check database connection
    healthChecks.checks.database = await checkDatabase();

    // Check external APIs
    healthChecks.checks.api = await checkExternalAPI();

    // Check Redis connection
    healthChecks.checks.redis = await checkRedis();

    // Check disk space
    healthChecks.checks.disk = await checkDiskSpace();

    // Check memory usage
    healthChecks.checks.memory = checkMemoryUsage();

    // Overall status
    const allHealthy = Object.values(healthChecks.checks).every(
      (check) => check.status === "healthy"
    );

    healthChecks.status = allHealthy ? "healthy" : "unhealthy";

    const statusCode = allHealthy ? 200 : 503;
    res.status(statusCode).json(healthChecks);
  } catch (error) {
    healthChecks.status = "unhealthy";
    healthChecks.error = error.message;
    res.status(503).json(healthChecks);
  }
}

async function checkDatabase() {
  try {
    // Database health check logic
    const start = Date.now();
    await db.raw("SELECT 1");
    const duration = Date.now() - start;

    return {
      status: "healthy",
      responseTime: `${duration}ms`,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error.message,
    };
  }
}

async function checkExternalAPI() {
  try {
    const start = Date.now();
    const response = await fetch(`${process.env.API_URL}/health`, {
      timeout: 5000,
    });
    const duration = Date.now() - start;

    return {
      status: response.ok ? "healthy" : "unhealthy",
      responseTime: `${duration}ms`,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error.message,
    };
  }
}

function checkMemoryUsage() {
  const usage = process.memoryUsage();
  const total = os.totalmem();
  const free = os.freemem();

  return {
    status: "healthy",
    heap: {
      used: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
    },
    system: {
      used: `${Math.round((total - free) / 1024 / 1024)}MB`,
      total: `${Math.round(total / 1024 / 1024)}MB`,
      free: `${Math.round(free / 1024 / 1024)}MB`,
    },
  };
}
```

### 2. Logging Estruturado

```javascript
// src/lib/logger.js
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: "myapp-frontend",
    version: process.env.APP_VERSION,
    environment: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// Add file transport in production
if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.File({
      filename: "/var/log/app/error.log",
      level: "error",
    })
  );

  logger.add(
    new winston.transports.File({
      filename: "/var/log/app/combined.log",
    })
  );
}

// Middleware para Express/Next.js
export function loggerMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP Request", {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
      userId: req.user?.id,
    });
  });

  next();
}

export default logger;
```

### 3. Métricas com Prometheus

```javascript
// src/lib/metrics.js
import promClient from "prom-client";

// Create a Registry
const register = new promClient.Registry();

// Add default metrics
promClient.collectDefaultMetrics({
  register,
  prefix: "myapp_frontend_",
});

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: "myapp_frontend_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

const httpRequestsTotal = new promClient.Counter({
  name: "myapp_frontend_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const activeUsers = new promClient.Gauge({
  name: "myapp_frontend_active_users",
  help: "Number of active users",
});

const errorRate = new promClient.Counter({
  name: "myapp_frontend_errors_total",
  help: "Total number of errors",
  labelNames: ["type", "route"],
});

// Register metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeUsers);
register.registerMetric(errorRate);

// Middleware to collect metrics
export function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;

    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);

    httpRequestsTotal.labels(req.method, route, res.statusCode).inc();

    if (res.statusCode >= 400) {
      errorRate.labels("http_error", route).inc();
    }
  });

  next();
}

// API endpoint for metrics
export async function metricsHandler(req, res) {
  res.set("Content-Type", register.contentType);
  const metrics = await register.metrics();
  res.end(metrics);
}

export { register, activeUsers, errorRate };
```

## 🔧 Infraestrutura como Código

### 1. Terraform para AWS

```hcl
# terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "myapp-terraform-state"
    key    = "frontend/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "myapp"
}

# S3 bucket for static files
resource "aws_s3_bucket" "frontend_assets" {
  bucket = "${var.app_name}-${var.environment}-frontend-assets"
}

resource "aws_s3_bucket_public_access_block" "frontend_assets" {
  bucket = aws_s3_bucket.frontend_assets.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "frontend_assets" {
  bucket = aws_s3_bucket.frontend_assets.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = aws_s3_bucket.frontend_assets.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend_assets.bucket}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend_assets.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior for static assets
  ordered_cache_behavior {
    path_pattern     = "/static/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-${aws_s3_bucket.frontend_assets.bucket}"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]
      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 31536000
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name        = "${var.app_name}-${var.environment}-frontend"
    Environment = var.environment
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_access_identity" "frontend" {
  comment = "Origin Access Identity for ${var.app_name}-${var.environment}"
}

# Outputs
output "cloudfront_domain_name" {
  description = "Domain name of CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "s3_bucket_name" {
  description = "Name of S3 bucket"
  value       = aws_s3_bucket.frontend_assets.bucket
}
```

### 2. Ansible para Configuração

```yaml
# ansible/deploy.yml
---
- name: Deploy Frontend Application
  hosts: web_servers
  become: yes
  vars:
    app_name: myapp
    app_version: "{{ lookup('env', 'APP_VERSION') | default('latest') }}"
    docker_image: "{{ app_name }}:{{ app_version }}"

  tasks:
    - name: Ensure Docker is installed
      apt:
        name: docker.io
        state: present
        update_cache: yes

    - name: Ensure Docker service is running
      systemd:
        name: docker
        state: started
        enabled: yes

    - name: Pull latest Docker image
      docker_image:
        name: "{{ docker_image }}"
        source: pull
        force_source: yes

    - name: Stop existing container
      docker_container:
        name: "{{ app_name }}"
        state: absent
      ignore_errors: yes

    - name: Start new container
      docker_container:
        name: "{{ app_name }}"
        image: "{{ docker_image }}"
        state: started
        restart_policy: always
        ports:
          - "3000:3000"
        env:
          NODE_ENV: production
          NEXT_PUBLIC_API_URL: "{{ api_url }}"
        healthcheck:
          test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
          interval: 30s
          timeout: 10s
          retries: 3

    - name: Wait for application to be ready
      uri:
        url: "http://localhost:3000/api/health"
        method: GET
        status_code: 200
      register: result
      until: result.status == 200
      retries: 10
      delay: 10

    - name: Configure Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}
      notify: reload nginx

    - name: Enable Nginx site
      file:
        src: /etc/nginx/sites-available/{{ app_name }}
        dest: /etc/nginx/sites-enabled/{{ app_name }}
        state: link
      notify: reload nginx

  handlers:
    - name: reload nginx
      systemd:
        name: nginx
        state: reloaded
```

## 🎯 Boas Práticas e Checklist

### ✅ Docker

- [ ] Multi-stage builds para reduzir tamanho da imagem
- [ ] Usar imagens base Alpine quando possível
- [ ] Implementar health checks
- [ ] Configurar usuário não-root
- [ ] Usar .dockerignore para otimizar build context

### ✅ CI/CD

- [ ] Testes automatizados em todas as etapas
- [ ] Build de imagens com cache layers
- [ ] Deployment automático para staging
- [ ] Approval manual para produção
- [ ] Rollback automático em caso de falha

### ✅ Monitoramento

- [ ] Health checks em todos os serviços
- [ ] Logging estruturado
- [ ] Métricas de performance
- [ ] Alertas para problemas críticos
- [ ] Dashboard de observabilidade

### ✅ Segurança

- [ ] Secrets gerenciados via variáveis de ambiente
- [ ] Imagens com atualizações de segurança
- [ ] HTTPS obrigatório
- [ ] Headers de segurança configurados
- [ ] Scan de vulnerabilidades nas imagens

## 🚀 Conclusão

DevOps para frontend não é mais opcional - é essencial para:

### Principais Benefícios

- **Deploys confiáveis** e automatizados
- **Ambientes consistentes** em todas as fases
- **Detecção precoce** de problemas
- **Escalabilidade** e alta disponibilidade
- **Colaboração eficiente** entre equipes

### Próximos Passos

1. **Containerize** sua aplicação com Docker
2. **Implemente** pipeline básico de CI/CD
3. **Configure** monitoramento e logging
4. **Automatize** deploys para staging
5. **Experimente** deployment strategies avançadas

Lembre-se: DevOps é uma jornada, não um destino. Comece pequeno e evolua gradualmente! 🎯

---

**Pronto para automatizar seus deploys?** Comece implementando essas práticas hoje mesmo! 🚀
