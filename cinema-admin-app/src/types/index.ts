export interface Cinema {
    id: string;
    name: string;
    location: string;
}

export interface Showtime {
    movieTitle: string;
    startTime: string; // ISO date string, e.g. "2025-05-29T20:00:00"
    auditorium: string;
    price: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}