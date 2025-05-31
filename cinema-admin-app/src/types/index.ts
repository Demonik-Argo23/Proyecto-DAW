export interface Cinema {
    id: number;
    name: string;
    location: string;
}

export interface Showtime {
    movieTitle: string;
    cinemaId: string;
    auditoriumId?: string;
    startTime: string; // ISO date string
    price?: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}