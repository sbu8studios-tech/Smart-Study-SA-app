import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for mockData.ts to be a relative path.
import { MOCK_CLASSROOMS } from '../mockData.ts';
import { TeacherAnalytics } from '../services/teacherService.ts';
// FIX: Corrected import path for types.ts to be a relative path.
import { Classroom } from '../types.ts';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { TrendingUpIcon, AnalyticsIcon } from './Icons.tsx';

const BarChart: React.FC<{ data: Record<string, number> }> = ({ data }) => {
    // FIX: Handle empty data array by providing a default of 0 to Math.max
    // and assert type for Object.values to satisfy TypeScript.
    const maxValue = Math.max(0, ...Object.values(data) as number[]);
    const grades = ['A', 'B', 'C', 'D', 'F']; // Ensure specific order

    return (
        <div className="flex justify-around items-end h-48 p-4 bg-bg-secondary rounded-lg">
            {grades.map(grade => {
                const value = data[grade] || 0;
                const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                return (
                    <div key={grade} className="flex flex-col items-center">
                        <div className="w-10 bg-primary-500 rounded-t-md hover:bg-primary-600 transition-colors" style={{ height: `${height}%` }} title={`${value} students`}></div>
                        <span className="text-sm font-bold mt-2">{grade}</span>
                    </div>
                );
            })}
        </div>
    );
};

const AnalyticsDashboard: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState<Classroom | null>(MOCK_CLASSROOMS[0] || null);
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedClass) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const data = await TeacherAnalytics.getClassPerformance(selectedClass.id, 'Term 3');
                    setAnalyticsData(data);
                } catch (error) {
                    console.error("Failed to fetch analytics data:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [selectedClass]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                 <h3 className="text-xl font-bold font-heading">Class Performance Analytics</h3>
                 <div>
                    <label htmlFor="class-select" className="text-sm font-semibold mr-2">Select a Class:</label>
                    <select
                        id="class-select"
                        value={selectedClass?.id || ''}
                        onChange={(e) => setSelectedClass(MOCK_CLASSROOMS.find(c => c.id === e.target.value) || null)}
                        className="p-2 rounded-lg bg-bg-primary border border-border-medium"
                    >
                        {MOCK_CLASSROOMS.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                 </div>
            </div>

            {isLoading && <p>Loading analytics...</p>}
            
            {!isLoading && analyticsData && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
                        <h4 className="font-bold text-lg mb-2 flex items-center"><TrendingUpIcon className="w-5 h-5 mr-2 text-success-500"/>Average Score</h4>
                        <p className="text-4xl font-bold font-heading">{analyticsData.averageScore}%</p>
                        <p className="text-sm text-text-secondary mt-1">Trend is <span className="font-semibold">{analyticsData.trendAnalysis}</span></p>
                    </div>
                    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
                        <h4 className="font-bold text-lg mb-2 flex items-center"><AnalyticsIcon className="w-5 h-5 mr-2 text-primary-500"/>Grade Distribution</h4>
                        <BarChart data={analyticsData.gradeDistribution} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsDashboard;
