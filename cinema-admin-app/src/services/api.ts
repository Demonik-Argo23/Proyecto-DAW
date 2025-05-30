import axios from 'axios';

const API_BASE_URL = 'https://api.cinema-admin.com'; // Replace with your actual API base URL

export const fetchCinemas = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cinemas`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching cinemas: ' + error.message);
    }
};

export const addShowtime = async (cinemaId, showtimeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cinemas/${cinemaId}/showtimes`, showtimeData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding showtime: ' + error.message);
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
};