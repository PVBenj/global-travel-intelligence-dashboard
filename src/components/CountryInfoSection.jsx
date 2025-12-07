import React from 'react';
import { Flag, Users, Map, Globe } from 'lucide-react';

const CountryInfoSection = ({ country }) => {
    if (!country) return null;

    return (
        <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '200ms' }}>
            <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <Flag className="w-6 h-6 mr-2 text-blue-600" />
                Country Information
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                            <Users className="w-4 h-4 mr-2" />
                            <span className="text-sm">Population</span>
                        </div>
                        <div className="text-2xl font-light text-gray-800 dark:text-white">
                            {country.population.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                            <Map className="w-4 h-4 mr-2" />
                            <span className="text-sm">Capital</span>
                        </div>
                        <div className="text-2xl font-light text-gray-800 dark:text-white">
                            {country.capital?.[0] || 'N/A'}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                            <Globe className="w-4 h-4 mr-2" />
                            <span className="text-sm">Region</span>
                        </div>
                        <div className="text-2xl font-light text-gray-800 dark:text-white">
                            {country.region}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Languages</div>
                        <div className="text-lg text-gray-800 dark:text-white">
                            {Object.values(country.languages || {}).join(', ')}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Currencies</div>
                        <div className="text-lg text-gray-800 dark:text-white">
                            {Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol || c.code})`).join(', ')}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Timezone</div>
                        <div className="text-lg text-gray-800 dark:text-white">
                            {country.timezones?.[0] || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryInfoSection;
