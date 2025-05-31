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
            <UserLogin
                onLoginSuccess={setToken}
                goToRegister={() => alert('Registro de usuario no implementado')}
                goToAdminLogin={() => alert('Login de admin no implementado')}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Bienvenido a Cinerex</h1>
            <CinemaList />
        </div>
    );
};

export default App;