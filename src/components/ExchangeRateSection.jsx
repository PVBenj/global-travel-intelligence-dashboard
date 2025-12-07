import React from 'react';
import { DollarSign } from 'lucide-react';

const ExchangeRateSection = ({ exchange, country }) => {
    if (!exchange || Object.keys(exchange).length === 0) return null;

    return (
        <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '400ms' }}>
            <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                Exchange Rates (1 USD =)
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                {country && country.currencies && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Local Currency</div>
                        {Object.entries(country.currencies).map(([code, curr]) => (
                            <div key={code} className="flex items-baseline gap-2">
                                <span className="text-2xl font-medium text-green-700 dark:text-green-400">
                                    {exchange[code]?.toFixed(2) || 'N/A'} {code}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">({curr.name})</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Common Currencies</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'].map((currency) => (
                        exchange[currency] && (
                            <div key={currency} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{currency}</div>
                                <div className="text-lg font-medium text-gray-800 dark:text-gray-200">{exchange[currency].toFixed(2)}</div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExchangeRateSection;
