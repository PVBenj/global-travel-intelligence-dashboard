import React from 'react';
import { Globe } from 'lucide-react';

const SearchOverlay = ({ isSearching, loadingMessages, loadingStage }) => {
    if (!isSearching) return null;

    return (
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
    );
};

export default SearchOverlay;
