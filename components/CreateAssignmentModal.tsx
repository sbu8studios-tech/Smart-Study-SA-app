import React, { useState } from 'react';
import { Assignment } from '../types.ts';
import { CloseIcon, ClipboardListIcon } from './Icons.tsx';
import { MOCK_CLASSROOMS } from '../mockData.ts';

interface CreateAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (assignmentData: Omit<Assignment, 'id' | 'totalSubmissions' | 'gradedSubmissions'>) => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [className, setClassName] = useState(MOCK_CLASSROOMS[0]?.name || '');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !className || !dueDate) {
            alert('Please fill out all fields.');
            return;
        }
        onSubmit({ title, className, dueDate });
        // Reset form and close
        setTitle('');
        setClassName(MOCK_CLASSROOMS[0]?.name || '');
        setDueDate('');
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-modal flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-bg-primary rounded-xl shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border-light flex justify-between items-center">
                    <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                        <ClipboardListIcon className="w-6 h-6 text-primary-500" />
                        Create New Assignment
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-tertiary">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-bold mb-1">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-bg-secondary border border-border-medium rounded-lg" required />
                    </div>
                     <div>
                        <label htmlFor="className" className="block text-sm font-bold mb-1">Class</label>
                        <select id="className" value={className} onChange={e => setClassName(e.target.value)} className="w-full p-2 bg-bg-secondary border border-border-medium rounded-lg" required>
                           {MOCK_CLASSROOMS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="dueDate" className="block text-sm font-bold mb-1">Due Date</label>
                        <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full p-2 bg-bg-secondary border border-border-medium rounded-lg" required />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="font-semibold px-4 py-2 rounded-lg hover:bg-bg-tertiary">Cancel</button>
                        <button type="submit" className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700">Create Assignment</button>
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

export default CreateAssignmentModal;