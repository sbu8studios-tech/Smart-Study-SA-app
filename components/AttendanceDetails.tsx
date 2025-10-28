import React from 'react';
import { StudentProfile } from '../types.ts';
// FIX: Imported CloseIcon to resolve 'Cannot find name' error.
import { CalendarIcon, CheckBadgeIcon, ClockIcon, CloseIcon } from './Icons.tsx';

interface AttendanceDetailsProps {
    student: StudentProfile;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; color: 'green' | 'red' | 'yellow' }> = ({ label, value, icon, color }) => {
    const colorClasses = {
        green: 'bg-green-100 text-green-800 dark:bg-success-500/10 dark:text-green-400',
        red: 'bg-red-100 text-red-800 dark:bg-error-500/10 dark:text-red-400',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-warning-500/10 dark:text-yellow-400',
    };
    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md flex items-center space-x-4">
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
            <div>
                <p className="text-2xl font-bold font-heading">{value}</p>
                <p className="text-sm text-text-secondary">{label}</p>
            </div>
        </div>
    );
};

const mockAttendance = {
    present: 120,
    absent: 2,
    late: 3,
    records: [
        { date: '2024-08-15', status: 'Present' },
        { date: '2024-08-14', status: 'Present' },
        { date: '2024-08-13', status: 'Late', reason: 'Arrived at 8:15 AM' },
        { date: '2024-08-12', status: 'Present' },
        { date: '2024-08-05', status: 'Absent', reason: 'Sick leave (note received)' },
    ]
};

const AttendanceDetails: React.FC<AttendanceDetailsProps> = ({ student }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading flex items-center"><CalendarIcon className="w-6 h-6 mr-2" />Attendance Record</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Days Present" value={mockAttendance.present} icon={<CheckBadgeIcon className="w-6 h-6" />} color="green" />
                <StatCard label="Days Absent" value={mockAttendance.absent} icon={<CloseIcon className="w-6 h-6" />} color="red" />
                <StatCard label="Days Late" value={mockAttendance.late} icon={<ClockIcon className="w-6 h-6" />} color="yellow" />
            </div>

            <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
                <h4 className="font-bold mb-3">Recent Records</h4>
                <ul className="divide-y divide-border-light">
                    {mockAttendance.records.map(record => (
                        <li key={record.date} className="py-3 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{new Date(record.date).toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                {record.reason && <p className="text-sm text-text-secondary">{record.reason}</p>}
                            </div>
                            <span className={`font-bold text-sm ${record.status === 'Present' ? 'text-success-500' : 'text-error-500'}`}>{record.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AttendanceDetails;
