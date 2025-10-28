import React from 'react';
import { AnalyticsIcon } from './Icons.tsx';

interface PerformanceChartProps {
    data: any; // In real app, this would be structured data
    timeRange: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, timeRange }) => {
    // This is a placeholder for a real charting library like Chart.js or Recharts
    return (
        <div className="bg-bg-secondary p-6 rounded-xl border border-border-light flex flex-col items-center justify-center h-64 text-center">
            <AnalyticsIcon className="w-12 h-12 text-text-tertiary mb-4" />
            <h4 className="font-bold text-lg">Performance Chart Placeholder</h4>
            <p className="text-text-secondary">
                Chart data for "{timeRange}" would be displayed here.
            </p>
        </div>
    );
};

export default PerformanceChart;