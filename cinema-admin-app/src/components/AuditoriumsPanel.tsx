import React, { useEffect, useState } from 'react';
import ShowtimesAdminPanel from './ShowtimesAdminPanel';
import DeleteShowtimeModal from './DeleteShowtimeModal';
import EditAuditoriumModal from './EditAuditoriumModal';

interface Auditorium {
    id: number;
    name: string;
    capacity: number;
}

interface Props {
    cinema: { id: number; name: string; location: string };
    onBack: () => void;
}

const AuditoriumsPanel: React.FC<Props> = ({ cinema, onBack }) => {
    const [auditoriums, setAuditoriums] = useState<Auditorium[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(50);
    const [createError, setCreateError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedAuditorium, setSelectedAuditorium] = useState<Auditorium | null>(null);
    const [deleteError, setDeleteError] = useState('');
    const [deletingAuditorium, setDeletingAuditorium] = useState<Auditorium | null>(null);
    const [editingAuditorium, setEditingAuditorium] = useState<Auditorium | null>(null);
    const [editName, setEditName] = useState('');
    const [editCapacity, setEditCapacity] = useState(50);
    const [editError, setEditError] = useState('');
    const [editSuccess, setEditSuccess] = useState('');

    const loadAuditoriums = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:4000/cinemas/${cinema.id}/auditoriums`);
            const data = await res.json();
            setAuditoriums(data);
        } catch {
            setError('Error al cargar salas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAuditoriums();
    }, [cinema.id]);

    const handleCreateAuditorium = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError('');
        setSuccess('');
        if (!name || !capacity) {
            setCreateError('Todos los campos son obligatorios.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:4000/cinemas/${cinema.id}/auditoriums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, capacity }),
            });
            if (res.ok) {
                setSuccess('¡Sala creada!');
                setName('');
                setCapacity(50);
                loadAuditoriums();
            } else {
                const data = await res.json();
                setCreateError(data.error || 'No se pudo crear la sala.');
            }
        } catch {
            setCreateError('Error de red.');
        }
    };

    const handleDeleteAuditorium = async () => {
        if (!deletingAuditorium) return;
        setDeleteError('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:4000/auditoriums/${deletingAuditorium.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (res.ok) {
                setDeletingAuditorium(null);
                loadAuditoriums();
            } else {
                const data = await res.json();
                setDeleteError(data.error || 'No se pudo eliminar la sala.');
            }
        } catch {
            setDeleteError('Error de red.');
        }
    };

    const openEditModal = (aud: Auditorium) => {
        setEditingAuditorium(aud);
        setEditName(aud.name);
        setEditCapacity(aud.capacity);
        setEditError('');
        setEditSuccess('');
    };

    const handleEditAuditorium = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAuditorium) return;
        setEditError('');
        setEditSuccess('');
        if (!editName || !editCapacity) {
            setEditError('Todos los campos son obligatorios.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:4000/auditoriums/${editingAuditorium.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editName, capacity: editCapacity }),
            });
            if (res.ok) {
                setEditSuccess('¡Sala actualizada!');
                setTimeout(() => {
                    setEditingAuditorium(null);
                    loadAuditoriums();
                }, 1000);
            } else {
                const data = await res.json();
                setEditError(data.error || 'No se pudo actualizar la sala.');
            }
        } catch {
            setEditError('Error de red.');
        }
    };

    if (selectedAuditorium) {
        return (
            <ShowtimesAdminPanel
                cinema={cinema}
                auditorium={selectedAuditorium}
                onBack={() => setSelectedAuditorium(null)}
            />
        );
    }

    return (
        <div style={{ marginBottom: 32 }}>
            <button onClick={onBack} style={{ marginBottom: 16, background: '#eee', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>
                ← Volver a cines
            </button>
            <h2 style={{ color: '#2563eb', marginBottom: 8 }}>{cinema.name} - Salas</h2>
            <div style={{ color: '#555', marginBottom: 16 }}>{cinema.location}</div>
            <form onSubmit={handleCreateAuditorium} style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
                <input
                    type="text"
                    placeholder="Nombre de la sala"
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
                    type="number"
                    placeholder="Capacidad"
                    value={capacity}
                    min={1}
                    onChange={e => setCapacity(Number(e.target.value))}
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #ccc',
                        fontSize: 16,
                        width: 120
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
                    Crear sala
                </button>
            </form>
            {createError && <div style={{ color: 'red', marginBottom: 8 }}>{createError}</div>}
            {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
            {loading ? (
                <div style={{ color: '#888' }}>Cargando salas...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {auditoriums.map(aud => (
                        <div key={aud.id} style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{aud.name}</div>
                            <div style={{ color: '#555', marginBottom: 8 }}>Capacidad: {aud.capacity}</div>
                                <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                                <button
                                    style={{
                                        background: '#2563eb',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '6px 14px',
                                        fontSize: 14,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setSelectedAuditorium(aud)}
                                >
                                    Funciones
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
                                        setDeletingAuditorium(aud);
                                        setDeleteError('');
                                    }}
                                >
                                    Eliminar
                                </button>
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
                                    onClick={() => openEditModal(aud)}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {deletingAuditorium && (
                <DeleteShowtimeModal
                    movieTitle={deletingAuditorium.name}
                    onConfirm={handleDeleteAuditorium}
                    onCancel={() => setDeletingAuditorium(null)}
                    error={deleteError}
                />
            )}
            {editingAuditorium && (
                <EditAuditoriumModal
                    name={editName}
                    setName={setEditName}
                    capacity={editCapacity}
                    setCapacity={setEditCapacity}
                    onSubmit={handleEditAuditorium}
                    onCancel={() => setEditingAuditorium(null)}
                    error={editError}
                    success={editSuccess}
                />
            )}
        </div>
    );
};

export default AuditoriumsPanel;