import React from 'react';
import { Assignment } from '../types.ts';
import { CalendarIcon, UsersIcon } from './Icons.tsx';

interface AssignmentCardProps {
    assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
    const { title, className, dueDate, totalSubmissions, gradedSubmissions } = assignment;
    const progress = totalSubmissions > 0 ? (gradedSubmissions / totalSubmissions) * 100 : 0;
    
    const isPastDue = new Date(dueDate) < new Date();
    const dueDateStatus = isPastDue ? 'text-error-500' : 'text-text-secondary';

    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
                <h4 className="font-bold text-lg text-text-primary mb-2 truncate">{title}</h4>
                <div className="flex items-center text-sm text-text-secondary mb-1">
                    <UsersIcon className="w-4 h-4 mr-2" />
                    <span>{className}</span>
                </div>
                <div className={`flex items-center text-sm ${dueDateStatus} mb-4`}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>Due: {dueDate}</span>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-1">
                    <span className="text-text-secondary">Grading Progress</span>
                    <span className="text-primary-600">{gradedSubmissions} / {totalSubmissions}</span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <button className="w-full mt-4 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 font-bold py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors">
                    View Submissions
                </button>
            </div>
        </div>
    );
};

export default AssignmentCard;