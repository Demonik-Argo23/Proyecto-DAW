import React from 'react';

interface Showtime {
    id: number;
    movie_title: string;
    start_time: string;
    price: number;
    auditorium_name: string;
}

interface Props {
    showtime: Showtime;
    onBuyClick: (showtime: Showtime) => void;
}

const ShowtimeCard: React.FC<Props> = ({ showtime, onBuyClick }) => (
    <div style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{showtime.movie_title}</div>
            <div style={{ color: '#555', marginBottom: 8 }}>Sala: {showtime.auditorium_name}</div>
            <div style={{ color: '#555', marginBottom: 8 }}>Horario: {new Date(showtime.start_time).toLocaleString()}</div>
            <div style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>Precio: ${showtime.price}</div>
        </div>
        <button
            style={{
                alignSelf: 'flex-end',
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontSize: 16,
                cursor: 'pointer',
                marginTop: 12
            }}
            onClick={() => onBuyClick(showtime)}
        >
            Comprar boletos
        </button>
    </div>
);

export default ShowtimeCard;