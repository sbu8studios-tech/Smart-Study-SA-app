import React from 'react';
import { User } from '../types.ts';

interface UsersTableProps {
    users: User[];
    selectedUserIds: string[];
    onSelectionChange: (ids: string[]) => void;
    onUserSelect: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, selectedUserIds, onSelectionChange, onUserSelect }) => {
    
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            onSelectionChange(users.map(u => u.id));
        } else {
            onSelectionChange([]);
        }
    };

    const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (e.target.checked) {
            onSelectionChange([...selectedUserIds, id]);
        } else {
            onSelectionChange(selectedUserIds.filter(selectedId => selectedId !== id));
        }
    };

    const isAllSelected = users.length > 0 && selectedUserIds.length === users.length;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-bg-tertiary">
                    <tr>
                        <th className="p-3 w-10">
                            <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} className="rounded" />
                        </th>
                        <th className="p-3 font-semibold text-text-secondary">Name</th>
                        <th className="p-3 font-semibold text-text-secondary">Role</th>
                        <th className="p-3 font-semibold text-text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-bg-secondary">
                            <td className="p-3">
                                <input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={e => handleSelectOne(e, user.id)} className="rounded" />
                            </td>
                            <td className="p-3">
                                <div className="flex items-center space-x-3">
                                    {user.avatarUrl && <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />}
                                    <div>
                                        <p className="font-bold text-text-primary">{user.name}</p>
                                        <p className="text-text-secondary">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3 capitalize">
                                <span className="px-2 py-1 text-xs font-bold rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500">
                                    {user.role}
                                </span>
                            </td>
                            <td className="p-3">
                                <button onClick={() => onUserSelect(user)} className="font-semibold text-primary-600 hover:underline">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.length === 0 && (
                <div className="text-center py-8 text-text-secondary">
                    <p>No users found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
