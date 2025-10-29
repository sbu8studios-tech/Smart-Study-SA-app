import React from 'react';
import { User } from '../types.ts';
import { CloseIcon } from './Icons.tsx';

interface UserDetailsPanelProps {
    user: User | null;
    onClose: () => void;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = ({ user, onClose }) => {
    if (!user) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal" onClick={onClose}>
            <div
                className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-primary shadow-xl animate-slide-in-right"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-border-light flex justify-between items-center">
                    <h2 className="text-xl font-bold font-heading">User Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-tertiary">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="text-center">
                        {user.avatarUrl && <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-500" />}
                        <h3 className="text-2xl font-bold">{user.name}</h3>
                        <p className="text-text-secondary">{user.email}</p>
                    </div>
                    
                    <div className="bg-bg-secondary p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className="font-semibold">User ID:</span>
                            <span>{user.id}</span>
                        </div>
                         <div className="flex justify-between mt-2">
                            <span className="font-semibold">Role:</span>
                            <span className="capitalize">{user.role}</span>
                        </div>
                    </div>

                     <div className="pt-4 flex justify-end gap-2">
                        <button className="font-semibold px-4 py-2 rounded-lg text-error-500 hover:bg-error-500/10">Deactivate</button>
                        <button className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700">Edit User</button>
                    </div>

                </div>
            </div>
             <style>{`
                @keyframes slide-in-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default UserDetailsPanel;