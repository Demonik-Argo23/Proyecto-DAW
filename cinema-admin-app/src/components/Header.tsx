import React from 'react';

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => (
    <header
        style={{
            width: '100%',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            padding: '16px 0',
            marginBottom: 32,
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}
    >
        <div style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{ flex: 1 }} />
            <h1 style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#2563eb',
                margin: 0,
                textAlign: 'center'
            }}>
                Cinerex
            </h1>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {isLoggedIn && (
                    <button
                        onClick={onLogout}
                        style={{
                            background: '#e53e3e',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            padding: '8px 18px',
                            fontSize: 16,
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar sesión
                    </button>
                )}
            </div>
        </div>
    </header>
);

export default Header;