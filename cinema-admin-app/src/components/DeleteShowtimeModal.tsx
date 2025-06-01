import React from 'react';

interface Props {
    movieTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
    error: string;
}

const DeleteShowtimeModal: React.FC<Props> = ({ movieTitle, onConfirm, onCancel, error }) => (
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
            <h3 style={{ marginBottom: 16, color: '#e53e3e' }}>¿Eliminar función?</h3>
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
                ¿Estás seguro que deseas eliminar la función<br />
                <b>{movieTitle}</b>?
            </div>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <div style={{ display: 'flex', gap: 12 }}>
                <button
                    onClick={onConfirm}
                    style={{
                        background: '#e53e3e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 18px',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Eliminar
                </button>
                <button
                    onClick={onCancel}
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

export default DeleteShowtimeModal;