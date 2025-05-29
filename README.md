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