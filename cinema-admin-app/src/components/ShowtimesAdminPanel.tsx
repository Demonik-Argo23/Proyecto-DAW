import React, { useEffect, useState } from 'react';
import EditShowtimeModal from './EditShowtimeModal';
import DeleteShowtimeModal from './DeleteShowtimeModal';

interface Showtime {
    id: number;
    movie_title: string;
    start_time: string;
    price: number;
}

interface Props {
    cinema: { id: number; name: string; location: string };
    auditorium: { id: number; name: string; capacity: number };
    onBack: () => void;
}

const ShowtimesAdminPanel: React.FC<Props> = ({ cinema, auditorium, onBack }) => {
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [movieTitle, setMovieTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [price, setPrice] = useState('');
    const [createError, setCreateError] = useState('');
    const [success, setSuccess] = useState('');

    // Edición
    const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
    const [editMovieTitle, setEditMovieTitle] = useState('');
    const [editStartTime, setEditStartTime] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editError, setEditError] = useState('');
    const [editSuccess, setEditSuccess] = useState('');

    // Eliminación
    const [deletingShowtime, setDeletingShowtime] = useState<Showtime | null>(null);
    const [deleteError, setDeleteError] = useState('');

    const loadShowtimes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:4000/cinemas/${cinema.id}/showtimes`);
            const data = await res.json();
            setShowtimes(data.filter((s: any) => s.auditorium_name === auditorium.name));
        } catch {
            setError('Error al cargar funciones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadShowtimes();
    }, [cinema.id, auditorium.id]);

    const handleCreateShowtime = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError('');
        setSuccess('');
        if (!movieTitle || !startTime || !price) {
            setCreateError('Todos los campos son obligatorios.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:4000/cinemas/${cinema.id}/showtimes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    auditoriumId: auditorium.id,
                    movie_title: movieTitle,
                    start_time: startTime,
                    price: Number(price)
                }),
            });
            if (res.ok) {
                setSuccess('¡Función creada!');
                setMovieTitle('');
                setStartTime('');
                setPrice('');
                loadShowtimes();
            } else {
                const data = await res.json();
                setCreateError(data.error || 'No se pudo crear la función.');
            }
        } catch {
            setCreateError('Error de red.');
        }
    };

    const openEditModal = (showtime: Showtime) => {
        setEditingShowtime(showtime);
        setEditMovieTitle(showtime.movie_title);
        setEditStartTime(showtime.start_time.slice(0, 16));
        setEditPrice(String(showtime.price));
        setEditError('');
        setEditSuccess('');
    };

    const handleEditShowtime = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingShowtime) return;
        setEditError('');
        setEditSuccess('');
        if (!editMovieTitle || !editStartTime || !editPrice) {
            setEditError('Todos los campos son obligatorios.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `http://localhost:4000/cinemas/${cinema.id}/showtimes/${editingShowtime.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        movie_title: editMovieTitle,
                        start_time: editStartTime,
                        price: Number(editPrice)
                    }),
                }
            );
            if (res.ok) {
                setEditSuccess('¡Función actualizada!');
                setTimeout(() => {
                    setEditingShowtime(null);
                    loadShowtimes();
                }, 1000);
            } else {
                const data = await res.json();
                setEditError(data.error || 'No se pudo actualizar la función.');
            }
        } catch {
            setEditError('Error de red.');
        }
    };

    const handleDeleteShowtime = async () => {
        if (!deletingShowtime) return;
        setDeleteError('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `http://localhost:4000/showtimes/${deletingShowtime.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (res.ok) {
                setDeletingShowtime(null);
                loadShowtimes();
            } else {
                const data = await res.json();
                setDeleteError(data.error || 'No se pudo eliminar la función.');
            }
        } catch {
            setDeleteError('Error de red.');
        }
    };

    return (
        <div style={{ marginBottom: 32 }}>
            <button onClick={onBack} style={{ marginBottom: 16, background: '#eee', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>
                ← Volver a salas
            </button>
            <h2 style={{ color: '#2563eb', marginBottom: 8 }}>{cinema.name} - {auditorium.name} - Funciones</h2>
            <form onSubmit={handleCreateShowtime} style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
                <input
                    type="text"
                    placeholder="Título de la película"
                    value={movieTitle}
                    onChange={e => setMovieTitle(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        flex: 2
                    }}
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha y hora"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        flex: 2
                    }}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    min={1}
                    onChange={e => setPrice(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        width: 100
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
                    Crear función
                </button>
            </form>
            {createError && <div style={{ color: 'red', marginBottom: 8 }}>{createError}</div>}
            {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
            {loading ? (
                <div style={{ color: '#888' }}>Cargando funciones...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {showtimes.map(st => (
                        <div key={st.id} style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{st.movie_title}</div>
                            <div style={{ color: '#555', marginBottom: 8 }}>Horario: {new Date(st.start_time).toLocaleString()}</div>
                            <div style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>Precio: ${st.price}</div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                <button
                                    style={{
                                        background: '#fbbf24',
                                        color: '#333',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '6px 14px',
                                        fontSize: 14,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => openEditModal(st)}
                                >
                                    Editar
                                </button>
                                <button
                                    style={{
                                        background: '#e53e3e',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '6px 14px',
                                        fontSize: 14,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setDeletingShowtime(st);
                                        setDeleteError('');
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editingShowtime && (
                <EditShowtimeModal
                    movieTitle={editMovieTitle}
                    setMovieTitle={setEditMovieTitle}
                    startTime={editStartTime}
                    setStartTime={setEditStartTime}
                    price={editPrice}
                    setPrice={setEditPrice}
                    onSubmit={handleEditShowtime}
                    onCancel={() => setEditingShowtime(null)}
                    error={editError}
                    success={editSuccess}
                />
            )}

            {deletingShowtime && (
                <DeleteShowtimeModal
                    movieTitle={deletingShowtime.movie_title}
                    onConfirm={handleDeleteShowtime}
                    onCancel={() => setDeletingShowtime(null)}
                    error={deleteError}
                />
            )}
        </div>
    );
};

export default ShowtimesAdminPanel;