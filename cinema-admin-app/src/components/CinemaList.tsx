import React, { useEffect, useState } from 'react';
import { fetchCinemas } from '../services/api';
import { Cinema } from '../types';

interface CinemaListProps {
    onSelectCinema: (cinema: { id: number, name: string }) => void;
}

const CinemaList: React.FC<CinemaListProps> = ({ onSelectCinema }) => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCinemas = async () => {
            try {
                const data = await fetchCinemas();
                setCinemas(data);
            } catch (err) {
                setError('Error al cargar los cines');
            } finally {
                setLoading(false);
            }
        };

        loadCinemas();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', color: '#888' }}>Cargando cines...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    return (
        <div className="cinema-list-container">
            {cinemas.map((cinema) => (
                <div key={cinema.id} className="cinema-card">
                    <div className="cinema-card-title">{cinema.name}</div>
                    <div className="cinema-card-location">{cinema.location}</div>
                    <button
                        className="cinema-card-btn"
                        onClick={() => onSelectCinema({ id: cinema.id, name: cinema.name })}
                    >
                        Ver funciones
                        <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CinemaList;