# Cinema Admin App

## Overview
The Cinema Admin App is a web application designed for cinema administrators to manage their cinemas effectively. The application allows administrators to log in, view statistics, manage showtimes, and handle various administrative tasks related to cinema operations.

## Features
- **Admin Dashboard**: Provides an overview of cinema statistics and quick access to functionalities.
- **Cinema Management**: View and manage a list of cinemas.
- **Showtimes Management**: Add or edit showtimes for specific movies in the cinemas.
- **User Authentication**: Secure login for administrators.

## Project Structure
```
cinema-admin-app
├── src
│   ├── components
│   │   ├── AdminDashboard.tsx
│   │   ├── CinemaList.tsx
│   │   └── ShowtimesForm.tsx
│   ├── pages
│   │   ├── Login.tsx
│   │   └── Home.tsx
│   ├── services
│   │   └── api.ts
│   └── types
│       └── index.ts
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd cinema-admin-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
docker compose up --build
```
This will create the database and run the backend

## Admin accounts
1. {
   username: "admin1",
   password: "cinerex"
}