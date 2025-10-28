import React, { useState } from 'react';
import { User, UserRole } from '../types.ts';
import { CloseIcon, UsersIcon } from './Icons.tsx';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: Omit<User, 'id'>) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.STUDENT);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            alert('Please fill out all fields.');
            return;
        }
        onSubmit({ name, email, role });
        // Reset form and close
        setName('');
        setEmail('');
        setRole(UserRole.STUDENT);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-modal flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-bg-primary rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border-light flex justify-between items-center">
                    <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                        <UsersIcon className="w-6 h-6 text-primary-500" />
                        Add New User
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-tertiary">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold mb-1">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 bg-bg-secondary border border-border-medium rounded-lg" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold mb-1">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 bg-bg-secondary border border-border-medium rounded-lg" required />
                    </div>
                     <div>
                        <label htmlFor="role" className="block text-sm font-bold mb-1">Role</label>
                        <select id="role" value={role} onChange={e => setRole(e.target.value as UserRole)} className="w-full p-2 bg-bg-secondary border border-border-medium rounded-lg capitalize" required>
                           {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="font-semibold px-4 py-2 rounded-lg hover:bg-bg-tertiary">Cancel</button>
                        <button type="submit" className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700">Create User</button>
                    </div>
                </form>
            </div>
             <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.2s ease-out; }
            `}</style>
        </div>
    );
};

export default AddUserModal;