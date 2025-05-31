import axios from 'axios';
import { Showtime, Cinema } from '../types';

const API_BASE_URL = 'http://localhost:4000'; // Usa tu backend local para desarrollo

export const fetchCinemas = async (): Promise<Cinema[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cinemas`);
        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching cinemas: ' + error.message);
    }
};

export const addShowtime = async (cinemaId: string, showtimeData: Showtime) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cinemas/${cinemaId}/showtimes`, showtimeData);
        return response.data;
    } catch (error: any) {
        throw new Error('Error adding showtime: ' + error.message);
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
        return response.data;
    } catch (error: any) {
        throw new Error('Error logging in: ' + error.message);
    }
};