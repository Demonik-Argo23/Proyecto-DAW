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
        <div style={{ maxWidth: 350, margin: 'auto', padding: 24 }}>
            <h2>Iniciar sesión (Usuario)</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: 8 }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: 8 }}
                />
                <button type="submit" style={{ width: '100%', marginBottom: 8 }}>
                    Iniciar sesión
                </button>
            </form>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <button onClick={goToRegister} style={{ width: '100%', marginBottom: 8 }}>
                Crear cuenta de usuario
            </button>
            <button onClick={goToAdminLogin} style={{ width: '100%', fontSize: 12, opacity: 0.6 }}>
                Acceso administrador
            </button>
        </div>
    );
};

export default UserLogin;