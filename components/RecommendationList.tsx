import React from 'react';
import { BulbIcon } from './Icons.tsx';

interface RecommendationListProps {
    recommendations: string[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) {
        return <p className="text-sm text-text-secondary">No recommendations available.</p>;
    }
    return (
        <ul className="space-y-3">
            {recommendations.map((rec, index) => (
                <li key={index} className="flex items-center space-x-3 p-3 bg-bg-secondary rounded-lg">
                    <BulbIcon className="w-5 h-5 text-warning-500 flex-shrink-0" />
                    <span className="text-sm text-text-primary">{rec}</span>
                </li>
            ))}
        </ul>
    );
};

export default RecommendationList;