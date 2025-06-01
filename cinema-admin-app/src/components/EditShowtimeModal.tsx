import React from 'react';

interface Props {
    movieTitle: string;
    setMovieTitle: (v: string) => void;
    startTime: string;
    setStartTime: (v: string) => void;
    price: string;
    setPrice: (v: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    error: string;
    success: string;
}

const EditShowtimeModal: React.FC<Props> = ({
    movieTitle, setMovieTitle, startTime, setStartTime, price, setPrice, onSubmit, onCancel, error, success
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
            <h3 style={{ marginBottom: 12 }}>Editar función</h3>
            <form onSubmit={onSubmit} style={{ width: '100%' }}>
                <input
                    type="text"
                    placeholder="Título de la película"
                    value={movieTitle}
                    onChange={e => setMovieTitle(e.target.value)}
                    style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        fontSize: 16
                    }}
                />
                <input
                    type="datetime-local"
                    placeholder="Fecha y hora"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        fontSize: 16
                    }}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    min={1}
                    onChange={e => setPrice(e.target.value)}
                    style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        fontSize: 16
                    }}
                />
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
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
                        Guardar cambios
                    </button>
                    <button
                        type="button"
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
            </form>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        </div>
    </div>
);

export default EditShowtimeModal;