import React from 'react';
import { Compass } from 'lucide-react';

const AttractionsSection = ({ attractions }) => {
    return (
        <>
            {attractions && attractions.length > 0 ? (
                <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '500ms' }}>
                    <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <Compass className="w-6 h-6 mr-2 text-purple-600" />
                        Top Attractions
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {attractions.map((place) => (
                                <div key={place.fsq_id} className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
                                    {place.image ? (
                                        <div className="h-40 overflow-hidden">
                                            <img
                                                src={place.image}
                                                alt={place.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center"><span class="text-purple-400 text-4xl">🏛️</span></div>';
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-40 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                                            <span className="text-purple-400 text-4xl">🏛️</span>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-1">{place.name}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                            {place.location.address || 'Address not available'}
                                        </div>
                                        <div className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wide">
                                            {place.categories?.[0]?.name || 'Point of Interest'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '500ms' }}>
                    <h3 className="text-2xl font-light text-gray-800 mb-4 flex items-center">
                        <Compass className="w-6 h-6 mr-2 text-purple-600" />
                        Top Attractions
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
                        <p className="text-gray-600 dark:text-gray-400">No attractions data available for this location.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AttractionsSection;
