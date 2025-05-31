import { Pool } from 'pg';
import dotenv from 'dotenv';
import { json } from 'stream/consumers';

dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Obtener la hora del servidor
export async function getDbTime() {
    const res = await pool.query('SELECT NOW()');
    return res.rows[0].now;
}

// --- CINEMAS ---

// Obtener todos los cines
export async function getCinemas() {
    const res = await pool.query('SELECT * FROM cinemas');
    return res.rows;
}

// Agregar un cine
export async function addCinema(name: string, location: string) {
    const res = await pool.query(
        'INSERT INTO cinemas (name, location) VALUES ($1, $2) RETURNING *',
        [name, location]
    );
    return res.rows[0];
}

// --- AUDITORIUMS ---

// Obtener todas las salas (auditoriums) de un cine
export async function getAuditoriums(cinemaId: number) {
    const res = await pool.query(
        'SELECT id, name FROM auditoriums WHERE cinema_id = $1',
        [cinemaId]
    );
    return res.rows;
}

// Agregar una sala (auditorium)
export async function addAuditorium(cinemaId: number, name: string) {
    const res = await pool.query(
        'INSERT INTO auditoriums (cinema_id, name) VALUES ($1, $2) RETURNING *',
        [cinemaId, name]
    );
    return res.rows[0];
}

// Actualizar una sala (auditorium)
export async function updateAuditorium(auditoriumId: number, name: string) {
    const res = await pool.query(
        'UPDATE auditoriums SET name = $1 WHERE id = $2 RETURNING *',
        [name, auditoriumId]
    );
    return res.rows[0];
}

//eliminar una sala (auditorium)
export async function deleteAuditorium(auditoriumId: number) {
    const res = await pool.query(
        'DELETE FROM auditoriums WHERE id = $1 RETURNING *',
        [auditoriumId]
    );
    return res.rows[0];
}

// --- SHOWTIMES ---

// Obtener todos los showtimes de un cine
export async function getShowtimesByCinema(cinemaId: number) {
    const res = await pool.query(
        `SELECT s.id, s.movie_title, s.start_time, s.price, a.name AS auditorium_name
         FROM showtimes s
         JOIN auditoriums a ON s.auditorium_id = a.id
         WHERE s.cinema_id = $1`,
        [cinemaId]
    );
    return res.rows;
}

// Obtener un showtime por movie title
export async function getShowtimeByMovieTitle(movie_title: string) {
    const res = await pool.query(
        `SELECT s.id, s.movie_title, s.start_time, s.price, a.name AS auditorium_name
         FROM showtimes s
         JOIN auditoriums a ON s.auditorium_id = a.id
         WHERE s.movie_title = $1`,
        [movie_title]
    );
    return res.rows;
}

// Obtener un showtime por ID
export async function getShowtimeById(showtimeId: number) {
    const res = await pool.query(
        `SELECT * FROM showtimes WHERE id = $1`,
        [showtimeId]
    );
    return res.rows[0];
}

// Agregar un showtime
export async function addShowtime(cinema_id: number, auditoriumId: number, movie_title: string, start_time: string, price: number) {
    const res = await pool.query(
        `INSERT INTO showtimes (cinema_id, auditorium_id, movie_title, start_time, price)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [cinema_id, auditoriumId, movie_title, start_time, price]
    );
    return res.rows[0];
}

// Actualizar un showtime
export async function updateShowtime(showtimeId: number, movie_title: string, start_time: string, price: number) {
    const res = await pool.query(
        `UPDATE showtimes
        SET movie_title = $1, start_time = $2, price = $3
        WHERE id = $4 RETURNING *`,
        [movie_title, start_time, price, showtimeId]
    );
    return res.rows[0];
}

//Actualizar un showtime de un cine
export async function updateShowtimeByCinema(cinemaId: number, showtimeId: number, movie_title: string, startTime: string, price: number) {
    const res = await pool.query(
        `UPDATE showtimes
        SET movie_title = $1, start_time = $2, price = $3
        WHERE cinema_id = $4 AND id = $5 RETURNING *`,
        [movie_title, startTime, price, cinemaId, showtimeId]
    );
    return res.rows[0];
}

// Eliminar un showtime
export async function deleteShowtime(showtimeId: number) {
    const res = await pool.query(
        'DELETE FROM showtimes WHERE id = $1 RETURNING *',
        [showtimeId]
    );
    return res.rows[0];
}

// --- USERS ---

// Registrar un nuevo usuario
export async function registerUser(email: string, password_hash: string) {
    const res = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
        [email, password_hash]
    );
    return res.rows[0];
}

// Obtener usuario por email
export async function getUserByEmail(email: string) {
    const res = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return res.rows[0];
}

// --- ADMINS ---

// Registrar un nuevo administrador
export async function registerAdmin(username: string, password_hash: string) {
    const res = await pool.query(
        'INSERT INTO admins (username, password_hash) VALUES ($1, $2) RETURNING *',
        [username, password_hash]
    );
    return res.rows[0];
}

// Obtener admin por username
export async function getAdminByUsername(username: string) {
    const res = await pool.query(
        'SELECT * FROM admins WHERE username = $1',
        [username]
    );
    return res.rows[0];
}

// --- BOOKINGS ---

// Crear una reservación (booking)
export async function createBooking(userId: number, showtimeId: number, seats: number, totalPrice: number) {
    const res = await pool.query(
        `INSERT INTO bookings (user_id, showtime_id, seats, total_price)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, showtimeId, seats, totalPrice]
    );
    return res.rows[0];
}

// Obtener bookings de un usuario
export async function getBookingsByUser(userId: number) {
    const res = await pool.query(
        `SELECT b.*, s.movie_title, s.start_time, s.price, a.name AS auditorium_name
         FROM bookings b
         JOIN showtimes s ON b.showtime_id = s.id
         JOIN auditoriums a ON s.auditorium_id = a.id
         WHERE b.user_id = $1
         ORDER BY b.booking_time DESC`,
        [userId]
    );
    return res.rows;
}