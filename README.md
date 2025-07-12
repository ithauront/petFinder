# 🐾 Petfinder API

A fully-tested and modular RESTful API built with Fastify, Prisma, and PostgreSQL. Designed with SOLID principles and clean architecture, this project simulates a pet adoption platform where organizations can register animals and visitors can search for pets available for adoption.

## 🐶 About the Project

This API enables organizations (ONGs) to register pets and manage their availability for adoption, while users can filter pets based on location and specific characteristics. It incorporates authentication, geolocation, and search functionality in a domain-driven architecture.

Throughout this project, I explored:

   * Creating a secure authentication system using JWT and refresh tokens with cookies.

   * Managing data permissions via role-based access control (RBAC).

   * Implementing advanced filtering by city and pet traits (e.g., energy level, size).

   * Using test-driven development (TDD) across unit, integration, and E2E layers.

   * Applying principles of clean architecture and modular separation of concerns.

## 🚀 Features

* ✅ ORG registration & authentication (JWT + cookies)
* 🐕 Pet registration and listing by authenticated ORGs
* 🌍 Pet search by city and filters (energy, age, size, etc.)
* 🔍 View detailed information about a pet
* ⏱️ Pagination for pet listings
* 🔐 RBAC (only authenticated ORGs can create pets)
* 🧪 Unit, integration, and E2E tests
* 🧱 Clean architecture and SOLID principles
* 🗃️ PostgreSQL + Prisma ORM
* 🐳 Docker setup for local development
* ⛑️ Zod for validation and error handling
* 📍 Automatic city/state detection via postal code (CEP) for Brazilian locations


## ⚙️ Technologies

   * Runtime: Node.js with Fastify

   * Database: PostgreSQL

   * ORM: Prisma

   * Testing: Vitest (unit, integration, e2e)

   * Validation: Zod

   * Authentication: JWT + Cookies

   * Architecture: SOLID + Clean Architecture

   * Dev Tools: Docker, Supertest, Vitest, TypeScript
     
   * HTTP Client: Axios

## 🔁 Continuous Integration (CI)

This project uses GitHub Actions to ensure reliability and code quality. It includes:

   ✅ Unit Tests on every push

   ✅ End-to-End Tests on every pull request

   🐳 A real PostgreSQL container is provisioned via Docker for E2E tests

   🧪 Environment variables set dynamically for isolated test environments


## 🧪 Running Tests

Unit tests:
```bash
npm run test
```

End-to-end tests:
```bash
npm run tests:e2e
```

Watch mode:
```bash
npm run test:watch
```

📦 Running Locally

   🐳 You'll need Docker installed to run the PostgreSQL container.

Clone the repo:
```bash
git clone https://github.com/ithauront/petfinder.git
cd petfinder
```

Copy environment variables:
```bash
cp .env.example .env
```

Then open the new .env file and make sure to configure the following:
```bash
NODE_ENV=dev
# JWT
JWT_SECRET="your_jwt_secret_here"
```
📝 This file is required to sign and verify authentication tokens. Be sure to use a secure and random string for JWT_SECRET.

Start the PostgreSQL container:
```bash
docker-compose up -d
```
Run database migrations:
```bash
npx prisma migrate dev
```

Start the development server:
```bash
npm run dev
```
📝 Notes:

  This project is not deployed in production. You can explore it locally using the instructions above. Some of my other backend projects are deployed. See portfolio for details.

##  📚 What I Learned
#### 🧠 Functional Design & Business Logic

   * Designed real-world workflows like pet registration, search, and authentication.

   * Modeled constraints such as access control, token expiration, and pet filtering.
     
   * Built a utility to convert Brazilian postal codes (CEPs) into city and state names by calling the public ViaCEP API. This simplifies the registration process for ORGs and improves data consistency.


#### 🧱 Clean Architecture & SOLID

   * Separated code into use-cases, repositories, controllers.

   * Applied inversion of control and single responsibility principles.

   * Used in-memory repositories to isolate tests and decouple infrastructure.

#### 🧪 Testing

  *  Implemented unit, integration, and end-to-end tests using Prisma and Docker.

  *  Ensured schema isolation using vitest-environment-prisma.

#### 🔒 Authentication & RBAC

  * JWT-based stateless authentication with secure cookies.

  *  Implemented refresh tokens and protected routes.

  * Controlled access: only ORGs can register pets.

#### 🔍 Search & Filtering

   * Enabled city-based search using query parameters.

   * Filtered pets by size, age, independence level, etc.

   * Designed scalable pagination for result sets.

#### 🛠️ Tooling & Developer Experience

   * Used aliases and strict TypeScript configuration.

   * Dockerized PostgreSQL for local dev and CI.

   * Structured CI with GitHub Actions and containerized test environments.
