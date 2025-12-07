import React from 'react';
import { Cloud, CloudRain, Sun, Droplets, Wind } from 'lucide-react';

const WeatherSection = ({ weather }) => {
    const getWeatherIcon = (weatherItem) => {
        const main = weatherItem?.toLowerCase();
        if (main?.includes('rain')) return <CloudRain className="w-16 h-16" />;
        if (main?.includes('cloud')) return <Cloud className="w-16 h-16" />;
        return <Sun className="w-16 h-16" />;
    };

    const getSmallWeatherIcon = (weatherItem) => {
        const main = weatherItem?.toLowerCase();
        if (main?.includes('rain')) return <CloudRain className="w-6 h-6" />;
        if (main?.includes('cloud')) return <Cloud className="w-6 h-6" />;
        return <Sun className="w-6 h-6" />;
    }


    return (
        <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '100ms' }}>
            <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <Cloud className="w-6 h-6 mr-2 text-blue-600" />
                Current Weather
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-center md:justify-start">
                        <div className="text-blue-500 mr-4">
                            {getWeatherIcon(weather.current.weather[0].main)}
                        </div>
                        <div>
                            <div className="text-5xl font-light text-gray-800 dark:text-white">
                                {Math.round(weather.current.main.temp)}°C
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 capitalize mt-1">
                                {weather.current.weather[0].description}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
                                <div className="text-lg font-medium dark:text-gray-200">{weather.current.main.humidity}%</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Wind className="w-5 h-5 text-blue-400 mr-2" />
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Wind</div>
                                <div className="text-lg font-medium dark:text-gray-200">{weather.current.wind.speed} m/s</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Forecast</div>
                        <div className="flex gap-2 overflow-x-auto">
                            {weather.forecast.slice(0, 4).map((item, i) => (
                                <div key={i} className="flex flex-col items-center min-w-[60px] p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        {new Date(item.dt * 1000).getHours()}:00
                                    </div>
                                    <div className="text-blue-500 my-1">
                                        {getSmallWeatherIcon(item.weather[0].main)}
                                    </div>
                                    <div className="text-sm font-medium dark:text-gray-200">{Math.round(item.main.temp)}°</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherSection;
