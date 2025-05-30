import React, { useEffect, useState } from 'react';
import { fetchCinemas } from '../services/api';
import { Cinema } from '../types';

const CinemaList: React.FC = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCinemas = async () => {
            try {
                const data = await fetchCinemas();
                setCinemas(data);
            } catch (err) {
                setError('Failed to fetch cinemas');
            } finally {
                setLoading(false);
            }
        };

        loadCinemas();
    }, []);

    if (loading) {
        return <div>Loading cinemas...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Cinema List</h2>
            <ul>
                {cinemas.map((cinema) => (
                    <li key={cinema.id}>
                        {cinema.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CinemaList;