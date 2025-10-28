import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { MessageIcon, UsersIcon } from './Icons';

const CommunicationCenter: React.FC = () => {
    const mockMessages = [
        { from: 'Brenda Smith (Parent)', subject: 'Question about Alex\'s progress', unread: true },
        { from: 'School Admin', subject: 'Staff Meeting Reminder - Fri 3pm', unread: false },
        { from: 'John Doe (Parent)', subject: 'Re: Grade 10 Homework', unread: false },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-heading flex items-center"><MessageIcon className="w-6 h-6 mr-2" />Communication Center</h3>
                <button className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">New Message</button>
            </div>

            <div className="bg-bg-primary rounded-xl border border-border-light shadow-md overflow-hidden">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-1/4 border-r border-border-light p-4 bg-bg-secondary">
                        <h4 className="font-bold mb-4">Folders</h4>
                        <ul>
                            <li className="font-semibold text-primary-600 bg-primary-100 dark:bg-primary-500/10 p-2 rounded-md">Inbox</li>
                            <li className="font-semibold text-text-secondary p-2 rounded-md hover:bg-bg-tertiary">Sent</li>
                            <li className="font-semibold text-text-secondary p-2 rounded-md hover:bg-bg-tertiary">Drafts</li>
                        </ul>
                    </div>
                    {/* Message List */}
                    <div className="w-3/4">
                        <ul className="divide-y divide-border-light">
                            {mockMessages.map((msg, i) => (
                                <li key={i} className={`p-4 hover:bg-bg-secondary cursor-pointer ${msg.unread ? 'font-bold' : ''}`}>
                                    <p className="text-text-primary">{msg.from}</p>
                                    <p className={`text-sm ${msg.unread ? 'text-text-secondary' : 'text-text-tertiary'}`}>{msg.subject}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
             <div className="p-4 text-center bg-bg-tertiary rounded-xl">
                <UsersIcon className="w-8 h-8 mx-auto text-text-tertiary" />
                <h4 className="text-md font-bold mt-2">Parent-Teacher communication is coming soon!</h4>
                <p className="text-sm text-text-secondary">This feature will enable seamless messaging between teachers and parents.</p>
            </div>
        </div>
    );
};

export default CommunicationCenter;