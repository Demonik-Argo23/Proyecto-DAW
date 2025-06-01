import React from 'react';

interface Showtime {
    id: number;
    movie_title: string;
    start_time: string;
    price: number;
}

interface Props {
    showtime: Showtime;
    onEdit: (showtime: Showtime) => void;
}

const ShowtimeAdminCard: React.FC<Props> = ({ showtime, onEdit }) => (
    <div style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }}>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>{showtime.movie_title}</div>
        <div style={{ color: '#555', marginBottom: 8 }}>Horario: {new Date(showtime.start_time).toLocaleString()}</div>
        <div style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>Precio: ${showtime.price}</div>
        <button
            style={{
                alignSelf: 'flex-end',
                background: '#fbbf24',
                color: '#333',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 14,
                cursor: 'pointer',
                marginTop: 8
            }}
            onClick={() => onEdit(showtime)}
        >
            Editar
        </button>
    </div>
);

export default ShowtimeAdminCard;