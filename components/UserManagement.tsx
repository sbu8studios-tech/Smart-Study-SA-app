import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../types.ts';
import UserStats from './UserStats.tsx';
import UserFilters from './UserFilters.tsx';
import UsersTable from './UsersTable.tsx';
import UserDetailsPanel from './UserDetailsPanel.tsx';
import BulkActionsDropdown from './BulkActionsDropdown.tsx';
import AddUserModal from './AddUserModal.tsx';
import { UsersIcon, AddCircleIcon } from './Icons.tsx';

interface UserManagementProps {
    users: User[];
}

const UserManagement: React.FC<UserManagementProps> = ({ users: initialUsers }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [filters, setFilters] = useState<{ query: string; role: UserRole | 'all' }>({ query: '', role: 'all' });
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const queryMatch = user.name.toLowerCase().includes(filters.query.toLowerCase()) || user.email.toLowerCase().includes(filters.query.toLowerCase());
            const roleMatch = filters.role === 'all' || user.role === filters.role;
            return queryMatch && roleMatch;
        });
    }, [users, filters]);

    const handleAddUser = (newUserData: Omit<User, 'id'>) => {
        const newUser: User = {
            id: `user-${Date.now()}`,
            ...newUserData
        };
        setUsers(prev => [newUser, ...prev]);
    };

    const handleBulkAction = (action: string) => {
        console.log(`Performing action "${action}" on users:`, selectedUserIds);
        // Here you would implement logic for deactivating, exporting, etc.
        setSelectedUserIds([]); // Clear selection after action
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading flex items-center"><UsersIcon className="w-6 h-6 mr-2" />User Management</h3>
            
            <UserStats users={users} />
            
            <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                    <UserFilters filters={filters} onFilterChange={setFilters} />
                    <div className="flex items-center gap-2">
                         <BulkActionsDropdown selectedUserIds={selectedUserIds} onAction={handleBulkAction} />
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                           <AddCircleIcon className="w-5 h-5" />
                           <span>Add User</span>
                        </button>
                    </div>
                </div>

                <UsersTable
                    users={filteredUsers}
                    selectedUserIds={selectedUserIds}
                    onSelectionChange={setSelectedUserIds}
                    onUserSelect={setSelectedUser}
                />
            </div>
            
            <UserDetailsPanel
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
            />

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddUser}
            />
        </div>
    );
};

export default UserManagement;
