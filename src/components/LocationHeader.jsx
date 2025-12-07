import React from 'react';
import { MapPin } from 'lucide-react';

const LocationHeader = ({ data }) => {
    return (
        <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '0ms' }}>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{data.coordinates.lat.toFixed(4)}, {data.coordinates.lng.toFixed(4)}</span>
            </div>
            <h2 className="text-4xl font-light text-gray-800 dark:text-white mb-2">{data.location}</h2>
            {data.country && (
                <div className="flex items-center gap-3">
                    <img src={data.country.flags.svg} alt="flag" className="w-8 h-6 rounded shadow-sm" />
                    <span className="text-lg text-gray-600 dark:text-gray-300">{data.country.name.common}</span>
                </div>
            )}
        </div>
    );
};

export default LocationHeader;
