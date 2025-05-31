import React from 'react';

interface Props {
    showtime: {
        movie_title: string;
        auditorium_name: string;
        start_time: string;
        price: number;
    };
    seats: number;
    setSeats: (n: number) => void;
    buyError: string;
    buySuccess: string;
    onBuy: () => void;
    onClose: () => void;
}

const BuyTicketsModal: React.FC<Props> = ({
    showtime, seats, setSeats, buyError, buySuccess, onBuy, onClose
}) => (
    <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    }}>
        <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            padding: 32,
            minWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h3 style={{ marginBottom: 12 }}>Comprar boletos</h3>
            <div style={{ marginBottom: 8, fontWeight: 600 }}>{showtime.movie_title}</div>
            <div style={{ marginBottom: 8 }}>Sala: {showtime.auditorium_name}</div>
            <div style={{ marginBottom: 8 }}>Horario: {new Date(showtime.start_time).toLocaleString()}</div>
            <div style={{ marginBottom: 16, color: '#2563eb', fontWeight: 600 }}>
                Precio por boleto: ${showtime.price}
            </div>
            <label style={{ marginBottom: 8 }}>
                Cantidad de boletos:
                <input
                    type="number"
                    min={1}
                    max={6}
                    value={seats}
                    onChange={e => setSeats(Number(e.target.value))}
                    style={{
                        marginLeft: 8,
                        width: 60,
                        padding: 4,
                        borderRadius: 6,
                        border: '1px solid #ccc'
                    }}
                />
            </label>
            <div style={{ marginBottom: 8 }}>
                Total: <b>${(showtime.price * seats).toFixed(2)}</b>
            </div>
            {buyError && <div style={{ color: 'red', marginBottom: 8 }}>{buyError}</div>}
            {buySuccess && <div style={{ color: 'green', marginBottom: 8 }}>{buySuccess}</div>}
            <div style={{ display: 'flex', gap: 12 }}>
                <button
                    onClick={onBuy}
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
                    disabled={!!buySuccess}
                >
                    Confirmar compra
                </button>
                <button
                    onClick={onClose}
                    style={{
                        background: '#eee',
                        color: '#333',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 18px',
                        fontSize: 16,
                        cursor: 'pointer'
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
);

export default BuyTicketsModal;