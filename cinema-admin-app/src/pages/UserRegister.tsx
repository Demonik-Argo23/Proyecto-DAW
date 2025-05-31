import React, { useState } from 'react';

interface Props {
    onRegisterSuccess: () => void;
    goToLogin: () => void;
}

const UserRegister: React.FC<Props> = ({ onRegisterSuccess, goToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password || !confirm) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (password !== confirm) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
                setTimeout(() => {
                    onRegisterSuccess();
                }, 1200);
            } else {
                const data = await res.json();
                setError(data.error || 'No se pudo registrar.');
            }
        } catch {
            setError('Error de red.');
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
            <h2 style={{ marginBottom: 24, color: '#2563eb', fontWeight: 700 }}>Crear cuenta</h2>
            <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
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
                    Registrarse
                </button>
            </form>
            {error && <div style={{ color: 'red', marginBottom: 12, width: '100%', textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12, width: '100%', textAlign: 'center' }}>{success}</div>}
            <button
                onClick={goToLogin}
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
                Volver a iniciar sesión
            </button>
        </div>
    );
};

export default UserRegister;