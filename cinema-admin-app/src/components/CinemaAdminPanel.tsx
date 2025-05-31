import React, { useEffect, useState } from 'react';
import { fetchCinemas } from '../services/api';

interface Cinema {
    id: number;
    name: string;
    location: string;
}

const CinemaAdminPanel: React.FC = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [createError, setCreateError] = useState('');
    const [success, setSuccess] = useState('');

    const loadCinemas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCinemas();
            setCinemas(data);
        } catch {
            setError('Error al cargar los cines');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCinemas();
    }, []);

    const handleCreateCinema = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError('');
        setSuccess('');
        if (!name || !location) {
            setCreateError('Todos los campos son obligatorios.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:4000/cinemas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, location }),
            });
            if (res.ok) {
                setSuccess('¡Cine creado!');
                setName('');
                setLocation('');
                loadCinemas();
            } else {
                const data = await res.json();
                setCreateError(data.error || 'No se pudo crear el cine.');
            }
        } catch {
            setCreateError('Error de red.');
        }
    };

    return (
        <div style={{ marginBottom: 32 }}>
            <h2 style={{ color: '#2563eb', marginBottom: 16 }}>Cines</h2>
            <form onSubmit={handleCreateCinema} style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
                <input
                    type="text"
                    placeholder="Nombre del cine"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        flex: 1
                    }}
                />
                <input
                    type="text"
                    placeholder="Ubicación"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        flex: 1
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 18px',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Crear cine
                </button>
            </form>
            {createError && <div style={{ color: 'red', marginBottom: 8 }}>{createError}</div>}
            {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
            {loading ? (
                <div style={{ color: '#888' }}>Cargando cines...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {cinemas.map(cinema => (
                        <div key={cinema.id} style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{cinema.name}</div>
                            <div style={{ color: '#555', marginBottom: 8 }}>{cinema.location}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CinemaAdminPanel;