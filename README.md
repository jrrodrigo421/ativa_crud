# Ativa CRUD

A full stack task management application with React frontend, FastAPI backend, and PostgreSQL database.

## Overview

This project is a complete CRUD application for managing tasks with user authentication. It consists of:

- **Backend**: FastAPI-based REST API with JWT authentication
- **Frontend**: React with TailwindCSS for styling
- **Database**: PostgreSQL

## Features

- User registration and authentication with JWT
- Complete CRUD operations for tasks
- Modern, responsive UI
- Swagger/OpenAPI documentation

## Tech Stack

- **Backend**:
  - Python 3.11
  - FastAPI
  - SQLAlchemy
  - PostgreSQL
  - JWT Authentication
  - Alembic (migrations)

- **Frontend**:
  - React 18
  - TailwindCSS
  - React Router
  - Axios

- **Containerization**:
  - Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose
- Git

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd ativa_crud
```

2. Start all services using Docker Compose:

```bash
docker-compose up -d
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Database Migrations

The project uses Alembic for database migrations. Migrations are automatically run during deployment.

### Creating new migrations

If you make changes to the database models, you need to create a new migration:

```bash
cd backend
alembic revision --autogenerate -m "Description of changes"
```

### Running migrations manually

To apply migrations manually:

```bash
cd backend
alembic upgrade head
```

## Deployment

This project is configured for deployment on Fly.io (backend) and Vercel (frontend).

### Prerequisites for Deployment

- [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) installed and authenticated
- [Vercel CLI](https://vercel.com/cli) installed and authenticated

### One-Click Deployment

Use our unified deployment script to deploy both backend and frontend:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
1. Deploy the database to Fly.io
2. Deploy the backend to Fly.io
3. Deploy the frontend to Vercel
4. Configure the necessary environment variables

### Manual Deployment

#### Backend (Fly.io)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Deploy to Fly.io:
   ```bash
   fly launch --name ativa-backend
   fly deploy
   ```

#### Frontend (Vercel)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Set the API URL environment variable:
   ```bash
   vercel env add REACT_APP_API_URL https://your-backend-url.fly.dev/api/v1
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## Project Structure

```
ativa_crud/
├── backend/            # FastAPI backend
│   ├── app/            # Application code
│   │   ├── api/        # API endpoints
│   │   ├── core/       # Core modules
│   │   ├── db/         # Database setup
│   │   ├── models/     # SQLAlchemy models
│   │   └── schemas/    # Pydantic schemas
│   ├── migrations/     # Alembic migrations
│   ├── Dockerfile      # Backend Docker configuration
│   └── requirements.txt # Python dependencies
├── frontend/           # React frontend
│   ├── public/         # Static files
│   ├── src/            # React components
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context
│   │   ├── pages/      # Page components
│   │   └── services/   # API services
│   ├── Dockerfile      # Frontend Docker configuration
│   └── package.json    # NPM dependencies
├── docker/             # Docker related files
└── docker-compose.yml  # Docker compose configuration
```

## Authentication

The application uses JWT for authentication. Users can:
- Register with email, username, and password
- Login with email/username and password
- Access protected routes with JWT token

## API Documentation

The API documentation is generated using Swagger and can be accessed at `http://localhost:8000/docs` when the application is running.

## Color Palette

The application uses the following color palette:
- Primary Dark: #880606
- Primary: #d53d0c
- Primary Light: #ff8207
- Secondary: #231d1e
- Light: #fcfcfc

## License

This project is for demonstration purposes only. 