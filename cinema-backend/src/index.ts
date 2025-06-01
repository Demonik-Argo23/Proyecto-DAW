// filepath: cinema-backend/src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {
  addCinema,
  getDbTime,
  getAuditoriums,
  addAuditorium,
  updateAuditorium,
  deleteAuditorium,
  getShowtimesByCinema,
  deleteShowtime,
  updateShowtimeByCinema,
  getCinemas,
  addShowtime,
  registerUser,
  getUserByEmail,
  registerAdmin,
  getAdminByUsername,
  createBooking,
  getBookingsByUser,
  getShowtimeById,
  pool
} from './db';
import { authenticateToken, requireAdmin, requireUser } from './auth';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // <-- habilita CORS para el origen específico
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const now = await getDbTime();
    res.send(`Cinema backend running! DB time: ${now}`);
  } catch (err) {
    res.status(500).send('Database connection error');
  }
});

// Obtener todos los cines
app.get('/cinemas', async (req: Request, res: Response) => {
  try {
    const cinemas = await getCinemas();
    res.json(cinemas);
  } catch (err) {
    console.error('Error fetching cinemas:', err);
    res.status(500).json({ error: 'Error fetching cinemas' });
  }
});

// Agregar un cine
app.post('/cinemas', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const { name, location } = req.body;
  try {
    const cinema = await addCinema(name, location);
    res.status(201).json(cinema);
  } catch (err) {
    console.error('Error adding cinema:', err);
    res.status(500).send('Error adding cinema');
  }
});

// Obtener todas las salas de un cine
app.get('/cinemas/:cinemaId/auditoriums', async (req: Request, res: Response) => {
  const cinemaId = Number(req.params.cinemaId);
  try {
    const auditoriums = await getAuditoriums(cinemaId);
    res.json(auditoriums);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener salas' });
  }
});

// Crear una sala
app.post('/cinemas/:cinemaId/auditoriums', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const cinemaId = Number(req.params.cinemaId);
  const { name, capacity } = req.body;
  if (!name || !Number.isInteger(capacity) || capacity <= 0) {
    res.status(400).json({ error: 'Name and positive integer capacity are required' });
    return;
  }
  try {
    const auditorium = await addAuditorium(cinemaId, name, capacity);
    res.status(201).json(auditorium);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear sala' });
  }
});

// Actualizar una sala
app.patch('/auditoriums/:auditoriumId', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const auditoriumId = Number(req.params.auditoriumId);
  const { name, capacity } = req.body;
  if (!name || !Number.isInteger(capacity) || capacity <= 0) {
    res.status(400).json({ error: 'Name and positive integer capacity are required' });
    return;
  }
  try {
    const auditorium = await updateAuditorium(auditoriumId, name, capacity);
    res.json(auditorium);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar sala' });
  }
});

//Eliminar una sala
app.delete('/auditoriums/:auditoriumId', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const auditoriumId = Number(req.params.auditoriumId);
  try {
    const result = await deleteAuditorium(auditoriumId);
    res.status(204).send();
  } catch (err: any) {
    if (err.code === '23503') {
      // Foreign key violation
      res.status(400).json({ error: 'No puedes eliminar la sala porque tiene funciones asociadas. Elimina primero las funciones.' });
    } else {
      res.status(500).json({ error: 'Error al eliminar sala' });
    }
  }
});

// Obtener funciones (showtimes) de un cine
app.get('/cinemas/:cinemaId/showtimes', async (req: Request, res: Response) => {
  const cinemaId = Number(req.params.cinemaId);
  try {
    const showtimes = await getShowtimesByCinema(cinemaId);
    res.json(showtimes);
  } catch (err) {
    console.error('Error fetching showtimes:', err);
    res.status(500).json({ error: 'Error fetching showtimes' });
  }
});

//Crear showtime
app.post('/cinemas/:cinemaId/showtimes', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const cinemaId = Number(req.params.cinemaId);
  const { auditoriumId, movie_title, start_time, price } = req.body;
  try {
    const newShowtime = await addShowtime(cinemaId, auditoriumId, movie_title, start_time, price);
    res.status(201).json(newShowtime);
  } catch (err) {
    console.error('Error creating showtime:', err);
    res.status(500).json({ error: 'Error creating showtime' });
  }
});

// actualizar una función (showtime)
app.patch('/cinemas/:cinemaId/showtimes/:showtimeId', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const cinemaId = Number(req.params.cinemaId);
  const showtimeId = Number(req.params.showtimeId);
  const { movie_title, start_time, price } = req.body;
  try {
    const updatedShowtime = await updateShowtimeByCinema(cinemaId, showtimeId, movie_title, start_time, price);
    res.json(updatedShowtime);
  } catch (err) {
    console.error('Error updating showtime:', err);
    res.status(500).json({ error: 'Error updating showtime' });
  }
});

// eliminar una función (showtime)
app.delete('/showtimes/:showtimeId', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const showtimeId = Number(req.params.showtimeId);
  try {
    await deleteShowtime(showtimeId);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting showtime:', err);
    res.status(500).json({ error: 'Error deleting showtime' });
  }
});

// Registrar usuario
app.post('/users/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const user = await registerUser(email, password_hash);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login usuario con JWT
app.post('/users/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: 'user' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ message: 'login successful', token, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Registrar admin
app.post('/admins/register', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const admin = await registerAdmin(username, password_hash);
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Login admin con JWT
app.post('/admins/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await getAdminByUsername(username);
    if (admin && await bcrypt.compare(password, admin.password_hash)) {
      const token = jwt.sign(
        { id: admin.id, username: admin.username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ message: 'login successful', token, admin });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Comprar boletos (crear booking) - solo usuarios autenticados
app.post('/showtimes/:showtimeId/bookings',
  authenticateToken,
  requireUser,
  async (req: Request, res: Response) => {
    const showtimeId = Number(req.params.showtimeId);
    const userId = (req as any).user.id;
    const { seats } = req.body;

    // Validar seats
    if (
      !Number.isInteger(seats) ||
      seats <= 0 ||
      seats > 6
    ) {
      res.status(400).json({ error: 'Seats must be an integer between 1 and 6' });
      return;
    }

    try {
      const showtime = await getShowtimeById(showtimeId);
      if (!showtime) {
        res.status(404).json({ error: 'Showtime not found' });
        return;
      }

      // Obtener la capacidad de la sala
      const auditoriumRes = await pool.query(
        'SELECT capacity FROM auditoriums WHERE id = $1',
        [showtime.auditorium_id]
      );
      const capacity = auditoriumRes.rows[0]?.capacity;
      if (!capacity) {
        res.status(500).json({ error: 'Auditorium capacity not found' });
        return;
      }

      // Calcular boletos ya vendidos para ese showtime
      const bookingsRes = await pool.query(
        'SELECT COALESCE(SUM(seats), 0) AS total_sold FROM bookings WHERE showtime_id = $1',
        [showtimeId]
      );
      const totalSold = Number(bookingsRes.rows[0].total_sold);

      if (totalSold + seats > capacity) {
        res.status(400).json({ error: 'Not enough seats available' });
        return;
      }

      const totalPrice = Number(showtime.price) * seats;
      const booking = await createBooking(userId, showtimeId, seats, totalPrice);
      res.status(201).json(booking);
    } catch (err) {
      console.error('Error creating booking:', err);
      res.status(500).json({ error: 'Error creating booking' });
    }
  }
);

// Obtener bookings del usuario autenticado
app.get('/users/bookings', authenticateToken, requireUser, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const bookings = await getBookingsByUser(userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

