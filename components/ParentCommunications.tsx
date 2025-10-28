import React from 'react';
import { StudentProfile } from '../types.ts';
import { MessageIcon, MailIcon } from './Icons.tsx';

interface ParentCommunicationsProps {
    student: StudentProfile;
}

const ParentCommunications: React.FC<ParentCommunicationsProps> = ({ student }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading flex items-center"><MessageIcon className="w-6 h-6 mr-2" />Teacher Communications</h3>
            
            <div className="p-8 text-center bg-bg-primary rounded-xl border-2 border-dashed border-border-medium">
                <MailIcon className="w-12 h-12 mx-auto text-text-tertiary" />
                <h4 className="text-lg font-bold mt-4">Direct Messaging Is Coming Soon</h4>
                <p className="text-text-secondary max-w-md mx-auto">
                    This feature will allow you to securely communicate with {student.name}'s teachers, ask questions, and stay updated directly within the app.
                </p>
                <button className="mt-4 bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors opacity-50 cursor-not-allowed">
                    Compose Message
                </button>
            </div>
        </div>
    );
};

export default ParentCommunications;