import React from 'react';

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Cinema Administration System!</p>
            <section>
                <h2>Overview</h2>
                <p>Here you can manage your cinemas, add showtimes, and view statistics.</p>
            </section>
            <section>
                <h2>Quick Access</h2>
                <ul>
                    <li><a href="/cinemas">Manage Cinemas</a></li>
                    <li><a href="/showtimes">Add/Edit Showtimes</a></li>
                    <li><a href="/statistics">View Statistics</a></li>
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;