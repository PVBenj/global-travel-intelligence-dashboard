import React from 'react';
import { Hotel, ExternalLink } from 'lucide-react';

const HotelsSection = ({ hotels }) => {
    return (
        <>
            {hotels && hotels.length > 0 ? (
                <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '600ms' }}>
                    <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <Hotel className="w-6 h-6 mr-2 text-pink-600" />
                        Best Hotels
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hotels.map((hotel) => (
                                <div key={hotel.hotel_id} className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
                                    {hotel.image ? (
                                        <div className="h-40 overflow-hidden">
                                            <img
                                                src={hotel.image}
                                                alt={hotel.hotel_name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center"><span class="text-pink-400 text-4xl">🏨</span></div>';
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-40 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center">
                                            <span className="text-pink-400 text-4xl">🏨</span>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="text-lg font-medium text-gray-800 dark:text-white mb-1">{hotel.hotel_name}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                            {hotel.address || 'Address not available'}
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-sm">
                                                {hotel.review_score ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm font-bold">
                                                            {hotel.review_score}
                                                        </span>
                                                        <span className="text-gray-600 dark:text-gray-300 text-xs">{hotel.review_word || 'Good'}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-pink-600 dark:text-pink-400 font-medium uppercase tracking-wide">
                                                        {hotel.accommodation_type}
                                                    </span>
                                                )}
                                            </div>
                                            {hotel.price && (
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                                        ${Math.round(hotel.price)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">per night</div>
                                                </div>
                                            )}
                                        </div>
                                        <a
                                            href={hotel.booking_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            <span>Book on Booking.com</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '600ms' }}>
                    <h3 className="text-2xl font-light text-gray-800 mb-4 flex items-center">
                        <Hotel className="w-6 h-6 mr-2 text-pink-600" />
                        Best Hotels
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
                        <p className="text-gray-600 dark:text-gray-400">No hotel data available for this location.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default HotelsSection;
