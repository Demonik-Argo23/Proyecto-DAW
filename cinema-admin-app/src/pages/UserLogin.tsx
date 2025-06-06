import React, { useState } from 'react';

interface Props {
    onLoginSuccess: (token: string) => void;
    goToRegister: () => void;
    goToAdminLogin: () => void;
}

const UserLogin: React.FC<Props> = ({ onLoginSuccess, goToRegister, goToAdminLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:4000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
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
            <h2 style={{ marginBottom: 24, color: '#2563eb', fontWeight: 700 }}>Iniciar sesión</h2>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                onClick={goToRegister}
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
                Crear cuenta de usuario
            </button>
            <button
                onClick={goToAdminLogin}
                style={{
                    width: '100%',
                    background: 'none',
                    color: '#888',
                    border: 'none',
                    fontSize: 13,
                    opacity: 0.7,
                    cursor: 'pointer'
                }}
            >
                Acceso administrador
            </button>
        </div>
    );
};

export default UserLogin;