# Cinema Admin App

## Overview
Cinema Admin App is a web platform for managing a cinema's operations. It allows administrators to manage cinemas, auditoriums, showtimes, and users, as well as handle ticket bookings. The system supports both admin and user authentication, and is fully dockerized for easy deployment.

## Features
- **Admin Dashboard**: Overview and quick access to cinema management features.
- **Cinema Management**: View and manage cinema information (single location).
- **Auditorium Management**: Add, edit, and delete auditoriums (salas).
- **Showtimes Management**: Add, edit, and delete showtimes for movies in auditoriums.
- **User Authentication**: Register and log in as a user to purchase tickets.
- **Admin Authentication**: Register and log in as an administrator.
- **Ticket Booking**: Users can book tickets for available showtimes (backend ready).
- **REST API**: Backend exposes endpoints for all management and booking operations.
- **Dockerized**: Easily run the entire stack (PostgreSQL + backend) with Docker Compose.

## Project Structure
```
cinema-admin-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── types/
├── public/
├── package.json
├── tsconfig.json
cinema-backend/
├── src/
│   ├── db.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── Dockerfile
db-init/
└── init.sql
docker-compose.yml
.env
README.md
```

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Node.js](https://nodejs.org/) (for frontend development)

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install frontend dependencies:**
   ```sh
   cd cinema-admin-app
   npm install
   ```

3. **Return to the project root:**
   ```sh
   cd ..
   ```

## Usage

### Run the full stack (backend + database) with Docker Compose

```sh
docker-compose up --build
```

- This will build and start the PostgreSQL database and backend API.
- The backend will be available at [http://localhost:4000](http://localhost:4000).

### Run the frontend (React app) in development mode

In a new terminal:

```sh
cd cinema-admin-app
npm start
```

- The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Default Admin Account

You can register a new admin via the API or use the following default credentials (if seeded):

```
username: admin1
password: cinerex
```

## API Overview

- `POST /users/register` — Register a new user
- `POST /users/login` — User login
- `POST /admins/register` — Register a new admin
- `POST /admins/login` — Admin login
- `GET /cinemas` — List cinemas
- `GET /cinemas/:cinemaId/auditoriums` — List auditoriums for a cinema
- `POST /cinemas/:cinemaId/auditoriums` — Add auditorium
- `PATCH /auditoriums/:auditoriumId` — Edit auditorium
- `DELETE /auditoriums/:auditoriumId` — Delete auditorium
- `GET /cinemas/:cinemaId/showtimes` — List showtimes for a cinema
- `POST /cinemas/:cinemaId/showtimes` — Add showtime
- `PATCH /cinemas/:cinemaId/showtimes/:showtimeId` — Edit showtime
- `DELETE /showtimes/:showtimeId` — Delete showtime

## Notes

- All passwords are securely hashed using bcrypt.
- The backend and database are fully containerized; data persists in Docker volumes.
- You can extend the system to support ticket booking and more advanced features.

---