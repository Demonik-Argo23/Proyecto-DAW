// filepath: cinema-backend/src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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
  getAdminByUsername
} from './db';

dotenv.config();

const app = express();
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
app.post('/cinemas', async (req: Request, res: Response) => {
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
app.post('/cinemas/:cinemaId/auditoriums', async (req: Request, res: Response) => {
  const cinemaId = Number(req.params.cinemaId);
  const { name } = req.body;
  try {
    const auditorium = await addAuditorium(cinemaId, name);
    res.status(201).json(auditorium);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear sala' });
  }
});

// Actualizar una sala
app.patch('/auditoriums/:auditoriumId', async (req: Request, res: Response) => {
  const auditoriumId = Number(req.params.auditoriumId);
  const { name } = req.body;
  try {
    const auditorium = await updateAuditorium(auditoriumId, name);
    res.json(auditorium);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar sala' });
  }
});

//Eliminar una sala
app.delete('/auditoriums/:auditoriumId', async (req: Request, res: Response) => {
  const auditoriumId = Number(req.params.auditoriumId);
  try {
    const result = await deleteAuditorium(auditoriumId); 
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar sala' });
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
app.post('/cinemas/:cinemaId/showtimes', async (req: Request, res: Response) => {
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
app.patch('/cinemas/:cinemaId/showtimes/:showtimeId', async (req: Request, res: Response) => {
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
app.delete('/showtimes/:showtimeId', async (req: Request, res: Response) => {
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

// Login usuario
app.post('/users/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      res.json({ message: 'login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Registrar admin
app.post('/admins/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const admin = await registerAdmin(username, password_hash);
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// Login admin
app.post('/admins/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await getAdminByUsername(username);
    if (admin && await bcrypt.compare(password, admin.password_hash)) {
      res.json({ message: 'login successful', admin });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});
