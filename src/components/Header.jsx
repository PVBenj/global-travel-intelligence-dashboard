import React from 'react';
import { Globe, Moon, Sun } from 'lucide-react';

const Header = ({ theme, toggleTheme, setShowResults }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Globe className="w-6 h-6 text-blue-600 mr-2" />
                        <h1 className="text-xl font-medium text-gray-800 dark:text-white">Global Travel Intelligence</h1>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => setShowResults(false)}
                            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mr-2 cursor-pointer"
                        >
                            New Search
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
