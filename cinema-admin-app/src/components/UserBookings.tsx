import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
    id: number;
    seats: number;
    total_price: number;
    booking_time: string;
    movie_title: string;
    start_time: string;
    price: number;
    auditorium_name: string;
}

const UserBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:4000/users/bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(res.data);
            } catch {
                setError('Error al cargar tus boletos');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', color: '#888' }}>Cargando tus boletos...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
    if (bookings.length === 0) return <div style={{ textAlign: 'center', color: '#888' }}>No has comprado boletos aún.</div>;

    return (
        <div style={{ width: '100%', maxWidth: 800 }}>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>Mis boletos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {bookings.map(b => (
                    <div key={b.id} style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{b.movie_title}</div>
                            <div style={{ color: '#555', marginBottom: 8 }}>Sala: {b.auditorium_name}</div>
                            <div style={{ color: '#555', marginBottom: 8 }}>Horario: {new Date(b.start_time).toLocaleString()}</div>
                            <div style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>Asientos: {b.seats}</div>
                            <div style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>Total: ${b.total_price}</div>
                            <div style={{ color: '#888', fontSize: 13 }}>Compra: {new Date(b.booking_time).toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBookings;