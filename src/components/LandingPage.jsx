import React from 'react';
import { Globe, Search, Cloud, AlertTriangle, Compass, Hotel, Moon, Sun } from 'lucide-react';

const LandingPage = ({
    theme,
    toggleTheme,
    particles,
    searchQuery,
    setSearchQuery,
    handleSearch,
    isSearching,
    error,
    loadingMessages,
    loadingStage
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-500">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animation: `float ${particle.duration}s ease-in-out infinite`,
                        animationDelay: `${particle.delay}s`
                    }}
                />
            ))}

            {/* Landing Page Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-gray-700 dark:text-gray-200 border border-white/20 shadow-lg cursor-pointer"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <div className="text-center mb-12 animate-[fadeIn_1s_ease-out]">
                    <div className="flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-blue-600 mr-3" />
                        <h1 className="text-xl font-medium text-gray-700 dark:text-blue-300">Global Travel Intelligence</h1>
                    </div>
                    <h2 className="text-6xl md:text-7xl font-medium text-gray-800 dark:text-white mb-4 tracking-tight">
                        Captain your journey
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">with the next-generation travel dashboard</p>
                </div>

                <div className="w-full max-w-2xl animate-[fadeIn_1s_ease-out_0.3s_both]">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-300">
                            <Search className="w-6 h-6 text-gray-400 ml-6" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search any destination..."
                                className="flex-1 px-6 py-5 text-lg focus:outline-none bg-transparent dark:text-white dark:placeholder-gray-500"
                                disabled={isSearching}
                            />
                            <button
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                            >
                                Explore
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full Screen Loading Overlay */}
                {isSearching && (
                    <div className="fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
                        <div className="relative mb-8">
                            <div className="w-24 h-24 border-4 border-blue-100 rounded-full animate-ping absolute top-0 left-0"></div>
                            <div className="w-24 h-24 border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                            <Globe className="w-10 h-10 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-2">Preparing your journey</h3>
                        <p className="text-blue-600 font-medium min-h-[1.5em] transition-all duration-300">
                            {loadingMessages[loadingStage]}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 px-6 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 animate-[fadeIn_0.3s_ease-out] max-w-2xl">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-[fadeIn_1s_ease-out_0.6s_both]">
                    <div className="flex flex-col items-center">
                        <Cloud className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Weather Insights</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Safety Advisories</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Compass className="w-8 h-8 text-green-500 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Top Attractions</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Hotel className="w-8 h-8 text-purple-500 mb-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Best Hotels</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
