import React, { useEffect, useState } from 'react';
import { fetchCinemas } from '../services/api';
import { Cinema } from '../types';
import { BuildingLibraryIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';

const CinemaList: React.FC = () => {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCinemas = async () => {
            try {
                const data = await fetchCinemas();
                setCinemas(data);
            } catch (err) {
                setError('Error al cargar los cines');
            } finally {
                setLoading(false);
            }
        };

        loadCinemas();
    }, []);

    if (loading) {
        return <div className="text-gray-500 text-center">Cargando cines...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {cinemas.map((cinema) => (
                <div
                    key={cinema.id}
                    className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <BuildingLibraryIcon className="h-8 w-8 text-blue-500" />
                        <span className="text-xl font-semibold">{cinema.name}</span>
                    </div>
                    <div className="text-gray-600 mb-4">{cinema.location}</div>
                    <button
                        className="mt-auto inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        // onClick={() => ...} // Aquí puedes manejar la navegación a las funciones del cine
                    >
                        Ver funciones
                        <ArrowRightCircleIcon className="h-5 w-5 ml-1" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CinemaList;