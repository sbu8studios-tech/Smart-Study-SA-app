import React from 'react';
import { UserRole } from '../types.ts';

interface UserFiltersProps {
    filters: { query: string; role: UserRole | 'all' };
    onFilterChange: (filters: { query: string; role: UserRole | 'all' }) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ filters, onFilterChange }) => {
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, query: e.target.value });
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ ...filters, role: e.target.value as UserRole | 'all' });
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
                type="text"
                placeholder="Search by name or email..."
                value={filters.query}
                onChange={handleQueryChange}
                className="w-full sm:w-64 p-2 bg-bg-secondary border border-border-medium rounded-lg"
            />
            <select
                value={filters.role}
                onChange={handleRoleChange}
                className="w-full sm:w-auto p-2 bg-bg-secondary border border-border-medium rounded-lg capitalize"
            >
                <option value="all">All Roles</option>
                {Object.values(UserRole).map(role => (
                    <option key={role} value={role}>{role}</option>
                ))}
            </select>
        </div>
    );
};

export default UserFilters;
