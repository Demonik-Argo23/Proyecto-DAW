import React from 'react';
import CinemaAdminPanel from './CinemaAdminPanel';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Cinema Administration System!</p>
            <CinemaAdminPanel />
            {/* Aquí puedes agregar más secciones para salas y showtimes */}
        </div>
    );
};

export default AdminDashboard;