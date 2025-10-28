import React, { useMemo } from 'react';
import { User, UserRole } from '../types.ts';
import { UsersIcon } from './Icons.tsx';

interface UserStatsProps {
    users: User[];
}

const StatCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light text-center shadow-md">
        <h4 className="font-bold text-4xl text-primary-500 font-heading">{value}</h4>
        <p className="text-text-secondary">{title}</p>
    </div>
);

const UserStats: React.FC<UserStatsProps> = ({ users }) => {
    const stats = useMemo(() => {
        return {
            total: users.length,
            students: users.filter(u => u.role === UserRole.STUDENT).length,
            teachers: users.filter(u => u.role === UserRole.TEACHER).length,
            parents: users.filter(u => u.role === UserRole.PARENT).length,
            admins: users.filter(u => u.role === UserRole.ADMIN).length,
        };
    }, [users]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard title="Total Users" value={stats.total} />
            <StatCard title="Students" value={stats.students} />
            <StatCard title="Teachers" value={stats.teachers} />
            <StatCard title="Parents" value={stats.parents} />
            <StatCard title="Admins" value={stats.admins} />
        </div>
    );
};

export default UserStats;
