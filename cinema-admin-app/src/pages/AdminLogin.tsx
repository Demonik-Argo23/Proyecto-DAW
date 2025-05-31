import React, { useState } from 'react';

interface Props {
    onLoginSuccess: (token: string) => void;
    goToUserLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLoginSuccess, goToUserLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:4000/admins/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                onLoginSuccess(data.token);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Network error');
        }
    };

    return (
        <div
            style={{
                maxWidth: 350,
                margin: 'auto',
                padding: 32,
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h2 style={{ marginBottom: 24, color: '#2563eb', fontWeight: 700 }}>Acceso administrador</h2>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
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
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        fontSize: 16
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '10px 0',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginBottom: 12
                    }}
                >
                    Iniciar sesión
                </button>
            </form>
            {error && <div style={{ color: 'red', marginBottom: 12, width: '100%', textAlign: 'center' }}>{error}</div>}
            <button
                onClick={goToUserLogin}
                style={{
                    width: '100%',
                    background: '#f3f4f6',
                    color: '#2563eb',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 0',
                    fontSize: 15,
                    fontWeight: 500,
                    marginBottom: 8,
                    cursor: 'pointer'
                }}
            >
                Volver a login de usuario
            </button>
        </div>
    );
};

export default AdminLogin;