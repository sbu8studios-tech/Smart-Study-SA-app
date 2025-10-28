import React from 'react';
import { AdminStats } from '../types.ts';

interface SystemOverviewProps {
    stats: AdminStats;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light text-center shadow-md">
            <h4 className="font-bold text-4xl text-primary-500 font-heading">{stats.totalStudents}</h4>
            <p className="text-text-secondary">Total Students</p>
        </div>
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light text-center shadow-md">
            <h4 className="font-bold text-4xl text-success-500 font-heading">{stats.totalTeachers}</h4>
            <p className="text-text-secondary">Total Teachers</p>
        </div>
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light text-center shadow-md">
            <h4 className="font-bold text-4xl text-warning-500 font-heading">{stats.activeClasses}</h4>
            <p className="text-text-secondary">Active Classes</p>
        </div>
    </div>
);

export default SystemOverview;