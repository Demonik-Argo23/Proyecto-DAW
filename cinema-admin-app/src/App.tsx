import React, { useState, useEffect } from 'react';
import UserLogin from './pages/UserLogin';
import CinemaList from './components/CinemaList';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    if (!token) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#f3f4f6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <UserLogin
                    onLoginSuccess={setToken}
                    goToRegister={() => alert('Registro de usuario no implementado')}
                    goToAdminLogin={() => alert('Login de admin no implementado')}
                />
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f3f4f6',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: 24
            }}>Bienvenido a Cinerex</h1>
            <CinemaList />
        </div>
    );
};

export default App;