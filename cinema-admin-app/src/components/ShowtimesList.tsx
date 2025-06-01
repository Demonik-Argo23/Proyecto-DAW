import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyTicketsModal from './BuyTicketsModal';
import ShowtimeCard from './ShowtimeCard';

interface Showtime {
    id: number;
    movie_title: string;
    start_time: string;
    price: number;
    auditorium_name: string;
}

interface Props {
    cinema: { id: number, name: string };
    onBack: () => void;
}

const ShowtimesList: React.FC<Props> = ({ cinema, onBack }) => {
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [buyingShowtime, setBuyingShowtime] = useState<Showtime | null>(null);
    const [seats, setSeats] = useState(1);
    const [buyError, setBuyError] = useState('');
    const [buySuccess, setBuySuccess] = useState('');

    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/cinemas/${cinema.id}/showtimes`);
                setShowtimes(res.data);
            } catch {
                setError('Error al cargar funciones');
            } finally {
                setLoading(false);
            }
        };
        fetchShowtimes();
    }, [cinema.id]);

    const handleBuy = async () => {
        setBuyError('');
        setBuySuccess('');
        if (!buyingShowtime) return;
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:4000/showtimes/${buyingShowtime.id}/bookings`,
                { seats },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBuySuccess('¡Compra exitosa!');
            setTimeout(() => {
                setBuyingShowtime(null);
                setBuySuccess('');
            }, 1500);
        } catch (err: any) {
            setBuyError(
                err.response?.data?.error ||
                'No se pudo completar la compra.'
            );
        }
    };

    if (loading) return <div style={{ textAlign: 'center', color: '#888' }}>Cargando funciones...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div style={{ width: '100%', maxWidth: 800 }}>
            <button onClick={onBack} style={{ marginBottom: 16, background: '#eee', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>
                ← Volver a cines
            </button>
            <h2 style={{ fontSize: 24, marginBottom: 24 }}>{cinema.name} - Funciones</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {showtimes.map(st => (
                    <ShowtimeCard
                        key={st.id}
                        showtime={st}
                        onBuyClick={showtime => {
                            setBuyingShowtime(showtime);
                            setSeats(1);
                            setBuyError('');
                            setBuySuccess('');
                        }}
                    />
                ))}
            </div>

            {/* Modal/Panel para comprar boletos */}
            {buyingShowtime && (
                <BuyTicketsModal
                    showtime={buyingShowtime}
                    seats={seats}
                    setSeats={setSeats}
                    buyError={buyError}
                    buySuccess={buySuccess}
                    onBuy={handleBuy}
                    onClose={() => setBuyingShowtime(null)}
                />
            )}
        </div>
    );
};

export default ShowtimesList;