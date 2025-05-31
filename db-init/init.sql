CREATE TABLE IF NOT EXISTS cinemas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS auditoriums (
    id SERIAL PRIMARY KEY,
    cinema_id INTEGER REFERENCES cinemas(id),
    name VARCHAR(50) NOT NULL
);

ALTER TABLE auditoriums ADD COLUMN IF NOT EXISTS capacity INTEGER NOT NULL DEFAULT 50;

CREATE TABLE IF NOT EXISTS showtimes (
    id SERIAL PRIMARY KEY,
    cinema_id INTEGER REFERENCES cinemas(id),
    auditorium_id INTEGER REFERENCES auditoriums(id),
    movie_title VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    price NUMERIC(8,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    showtime_id INTEGER REFERENCES showtimes(id),
    seats INTEGER NOT NULL,
    total_price NUMERIC(8,2) NOT NULL,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);