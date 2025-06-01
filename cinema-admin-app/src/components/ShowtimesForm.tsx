import React, { useState, useEffect } from 'react';
import { addShowtime } from '../services/api';
import { Showtime } from '../types';

const ShowtimesForm: React.FC = () => {
    const [movieTitle, setMovieTitle] = useState('');
    const [cinemaId, setCinemaId] = useState('');
    const [showtime, setShowtime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!movieTitle || !cinemaId || !showtime) {
            setError('All fields are required.');
            return;
        }

        const newShowtime: Showtime = {
            movieTitle,
            cinemaId,
            startTime: showtime,
        };

        try {
            await addShowtime(cinemaId, newShowtime);
            setSuccess('Showtime added successfully!');
            setMovieTitle('');
            setCinemaId('');
            setShowtime('');
        } catch (err) {
            setError('Failed to add showtime. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Showtime</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Movie Title:</label>
                    <input
                        type="text"
                        value={movieTitle}
                        onChange={(e) => setMovieTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Cinema ID:</label>
                    <input
                        type="text"
                        value={cinemaId}
                        onChange={(e) => setCinemaId(e.target.value)}
                    />
                </div>
                <div>
                    <label>Showtime:</label>
                    <input
                        type="datetime-local"
                        value={showtime}
                        onChange={(e) => setShowtime(e.target.value)}
                    />
                </div>
                <button type="submit">Add Showtime</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default ShowtimesForm;