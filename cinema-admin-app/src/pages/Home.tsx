import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import CinemaList from '../components/CinemaList';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Cinema Administration</h1>
            <AdminDashboard />
            <CinemaList />
        </div>
    );
};

export default Home;