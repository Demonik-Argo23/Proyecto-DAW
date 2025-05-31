import React, { useState, useEffect } from 'react';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import CinemaList from './components/CinemaList';
import ShowtimesList from './components/ShowtimesList';
import Header from './components/Header';
import UserBookings from './components/UserBookings';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(() => localStorage.getItem('role'));
    const [selectedCinema, setSelectedCinema] = useState<{ id: number, name: string } | null>(null);
    const [showRegister, setShowRegister] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');
        }
    }, [token, role]);

    const handleUserLogin = (token: string) => {
        setToken(token);
        setRole('user');
    };
    const handleAdminLogin = (token: string) => {
        setToken(token);
        setRole('admin');
    };

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
                <Header isLoggedIn={false} onLogout={() => {}} />
                {showAdminLogin ? (
                    <AdminLogin
                        onLoginSuccess={handleAdminLogin}
                        goToUserLogin={() => setShowAdminLogin(false)}
                    />
                ) : showRegister ? (
                    <UserRegister
                        onRegisterSuccess={() => setShowRegister(false)}
                        goToLogin={() => setShowRegister(false)}
                    />
                ) : (
                    <UserLogin
                        onLoginSuccess={handleUserLogin}
                        goToRegister={() => setShowRegister(true)}
                        goToAdminLogin={() => setShowAdminLogin(true)}
                    />
                )}
            </div>
        );
    }

    if (role === 'admin') {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#f3f4f6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <Header
                    isLoggedIn={!!token}
                    onLogout={() => {
                        setToken(null);
                        setRole(null);
                        setSelectedCinema(null);
                    }}
                />
                <div style={{ width: '100%', maxWidth: 900 }}>
                    <AdminDashboard />
                </div>
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
            justifyContent: 'flex-start'
        }}>
            <Header
                isLoggedIn={!!token}
                onLogout={() => {
                    setToken(null);
                    setRole(null);
                    setSelectedCinema(null);
                }}
            />
            <div style={{ width: '100%', maxWidth: 800 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                    <button
                        onClick={() => setShowBookings(b => !b)}
                        style={{
                            background: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '8px 18px',
                            fontSize: 16,
                            cursor: 'pointer'
                        }}
                    >
                        {showBookings ? 'Ver cines' : 'Mis boletos'}
                    </button>
                </div>
                {showBookings ? (
                    <UserBookings />
                ) : !selectedCinema ? (
                    <CinemaList onSelectCinema={setSelectedCinema} />
                ) : (
                    <ShowtimesList
                        cinema={selectedCinema}
                        onBack={() => setSelectedCinema(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;