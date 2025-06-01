import React from 'react';
import CinemaAdminPanel from '../components/CinemaAdminPanel';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Gestión de cines, salas y funciones</p>
            <CinemaAdminPanel />
            {/* Aquí puedes agregar más secciones para salas y showtimes */}
        </div>
    );
};

export default AdminDashboard;