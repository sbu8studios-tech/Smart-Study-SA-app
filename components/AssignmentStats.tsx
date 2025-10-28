import React from 'react';
import { Assignment } from '../types.ts';
import { ClipboardListIcon, ChartPieIcon, ClockIcon } from './Icons.tsx';

interface AssignmentStatsProps {
    assignments: Assignment[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light flex items-center space-x-4 shadow-md">
        <div className="bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold font-heading">{value}</p>
            <p className="text-sm text-text-secondary">{title}</p>
        </div>
    </div>
);

const AssignmentStats: React.FC<AssignmentStatsProps> = ({ assignments }) => {
    const totalAssignments = assignments.length;
    const totalSubmissions = assignments.reduce((acc, a) => acc + a.totalSubmissions, 0);
    const totalGraded = assignments.reduce((acc, a) => acc + a.gradedSubmissions, 0);
    const overallProgress = totalSubmissions > 0 ? Math.round((totalGraded / totalSubmissions) * 100) : 0;
    
    // Mock average turnaround time
    const avgTurnaround = '2.5 Days'; 

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold font-heading mb-4">Overall Statistics</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Assignments" value={totalAssignments} icon={<ClipboardListIcon className="w-6 h-6" />} />
                <StatCard title="Overall Grading Progress" value={`${overallProgress}%`} icon={<ChartPieIcon className="w-6 h-6" />} />
                <StatCard title="Avg. Turnaround Time" value={avgTurnaround} icon={<ClockIcon className="w-6 h-6" />} />
            </div>
        </div>
    );
};

export default AssignmentStats;