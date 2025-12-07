import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const TravelAdvisorySection = ({ advisory }) => {
    const getSafetyText = (score) => {
        if (score < 2.5) return 'Exercise normal precautions';
        if (score < 3.5) return 'Exercise increased caution';
        if (score < 4.5) return 'Reconsider travel';
        return 'Do not travel';
    };

    return (
        <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '300ms' }}>
            <h3 className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
                Travel Safety
            </h3>
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border transition-colors duration-300 ${advisory?.level === 4 ? 'border-red-300 bg-red-50 dark:bg-red-900/10 dark:border-red-900' :
                advisory?.level === 3 ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-900' :
                    advisory?.level === 2 ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-900' :
                        advisory?.level === 1 ? 'border-green-300 bg-green-50 dark:bg-green-900/10 dark:border-green-900' :
                            'border-gray-100 dark:border-gray-700'
                }`}>
                {advisory && advisory.level > 0 ? (
                    <div>
                        {/* Level Badge */}
                        <div className="flex items-center justify-between mb-4">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-medium ${advisory.level === 4 ? 'bg-red-600' :
                                advisory.level === 3 ? 'bg-orange-500' :
                                    advisory.level === 2 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                }`}>
                                <span className="text-lg mr-2">Level {advisory.level}</span>
                                <span>{advisory.levelText || getSafetyText(advisory.score)}</span>
                            </div>
                            <AlertTriangle className={`w-12 h-12 ${advisory.level === 4 ? 'text-red-600' :
                                advisory.level === 3 ? 'text-orange-500' :
                                    advisory.level === 2 ? 'text-yellow-500' :
                                        'text-green-500'
                                }`} />
                        </div>

                        {/* Summary */}
                        <div className={`p-4 rounded-lg mb-4 ${advisory.level === 4 ? 'bg-red-100 dark:bg-red-900/30' :
                            advisory.level === 3 ? 'bg-orange-100 dark:bg-orange-900/30' :
                                advisory.level === 2 ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                    'bg-green-100 dark:bg-green-900/30'
                            }`}>
                            <p className={`text-sm font-medium mb-2 ${advisory.level === 4 ? 'text-red-800 dark:text-red-200' :
                                advisory.level === 3 ? 'text-orange-800 dark:text-orange-200' :
                                    advisory.level === 2 ? 'text-yellow-800 dark:text-yellow-200' :
                                        'text-green-800 dark:text-green-200'
                                }`}>
                                {advisory.message}
                            </p>
                            {advisory.summary && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {advisory.summary}
                                </p>
                            )}
                        </div>

                        {/* Source & Link */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                                Source: {advisory.source || 'US Department of State'}
                            </span>
                            {advisory.link && (
                                <a
                                    href={advisory.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                                >
                                    View Full Advisory <ExternalLink className="w-4 h-4 ml-1" />
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <AlertTriangle className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Travel Advisory</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{advisory?.message || 'Advisory data not available'}</p>
                        {advisory?.summary && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{advisory.summary}</p>
                        )}
                        <div className="flex gap-3 justify-center flex-wrap mt-4">
                            <a
                                href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            >
                                US State Dept
                            </a>
                            <a
                                href="https://www.gov.uk/foreign-travel-advice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            >
                                UK FCDO
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelAdvisorySection;
