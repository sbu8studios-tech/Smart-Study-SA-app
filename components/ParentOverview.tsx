import React, { useState } from 'react';
import { MOCK_ACTIVITIES, MOCK_EVENTS, MOCK_SUBMISSIONS } from '../mockData.ts';
import { StudentProfile, Activity, CalendarEvent, StudentSubmission, AcademicReport, AIInsight } from '../types.ts';
import { ParentReports } from '../services/parentService.ts';
import { AnalyticsIcon, CheckBadgeIcon, ClipboardListIcon, CalendarIcon, DocumentTextIcon } from './Icons.tsx';
import ParentReportModal from './ParentReportModal.tsx';

interface ParentOverviewProps {
    student: StudentProfile;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light flex items-center space-x-4 shadow-md">
        <div className="bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold font-heading">{value}</p>
            <p className="text-sm text-text-secondary">{label}</p>
        </div>
    </div>
);

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <li className="py-3 flex items-start space-x-3">
        <div className="bg-bg-tertiary p-2 rounded-full mt-1">
            {activity.type === 'grade' && <CheckBadgeIcon className="w-5 h-5 text-success-500" />}
            {activity.type === 'assignment' && <ClipboardListIcon className="w-5 h-5 text-primary-500" />}
            {activity.type === 'login' && <AnalyticsIcon className="w-5 h-5 text-warning-500" />}
        </div>
        <div>
            <p className="text-sm font-medium">{activity.description}</p>
            <p className="text-xs text-text-secondary">{activity.timestamp}</p>
        </div>
    </li>
);

const AssignmentItem: React.FC<{ submission: StudentSubmission }> = ({ submission }) => {
    const statusStyles = {
        Graded: 'bg-green-100 text-green-800 dark:bg-success-500/10 dark:text-green-400',
        Submitted: 'bg-blue-100 text-blue-800 dark:bg-primary-500/10 dark:text-blue-400',
        Overdue: 'bg-red-100 text-red-800 dark:bg-error-500/10 dark:text-red-400',
    };
    return (
        <li className="py-3 flex justify-between items-center">
            <div>
                <p className="font-semibold">{submission.assignmentTitle}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyles[submission.status]}`}>{submission.status}</span>
            </div>
            {submission.grade !== null && <p className="text-lg font-bold">{submission.grade}%</p>}
        </li>
    );
};

const CalendarItem: React.FC<{ event: CalendarEvent }> = ({ event }) => (
    <li className="py-3 flex items-center space-x-4">
        <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-lg">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-500 uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-500">{new Date(event.date).getDate()}</span>
        </div>
        <div>
            <p className="font-semibold">{event.title}</p>
            <p className={`text-xs font-medium ${event.type === 'school' ? 'text-warning-500' : 'text-primary-500'}`}>{event.type === 'school' ? 'School Event' : 'Class Event'}</p>
        </div>
    </li>
);

const DashboardSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
        <h3 className="text-lg font-bold mb-3 font-heading text-text-primary">{title}</h3>
        {children}
    </div>
);

const ParentOverview: React.FC<ParentOverviewProps> = ({ student }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportData, setReportData] = useState<{ report: AcademicReport | null; insights: AIInsight | null }>({ report: null, insights: null });
    const [isReportLoading, setIsReportLoading] = useState(false);
    
    const handleViewReport = async (studentId: string) => {
        setIsReportLoading(true);
        setIsReportModalOpen(true);
        try {
            const [report, insights] = await Promise.all([
                ParentReports.generateProgressReport(studentId, 'Term 3'),
                ParentReports.getAIInsights(studentId)
            ]);
            setReportData({ report, insights });
        } catch (error) {
            console.error("Failed to load report data:", error);
        } finally {
            setIsReportLoading(false);
        }
    };
    
    const stats = [
        { label: 'Overall Performance', value: `${student.overallPerformance}%`, icon: <AnalyticsIcon className="w-6 h-6" /> },
        { label: 'Attendance', value: '98%', icon: <CheckBadgeIcon className="w-6 h-6" /> }, // Hardcoded for mock
        { label: 'Assignments Due', value: MOCK_SUBMISSIONS.filter(s => s.status !== 'Graded').length, icon: <ClipboardListIcon className="w-6 h-6" /> },
        { label: 'Upcoming Events', value: MOCK_EVENTS.length, icon: <CalendarIcon className="w-6 h-6" /> },
    ];
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <DashboardSection title="Reports & Insights">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-primary-50 dark:bg-primary-500/10 p-4 rounded-lg">
                            <div>
                                <h4 className="font-bold text-primary-700 dark:text-primary-400">View In-depth Report</h4>
                                <p className="text-sm text-primary-600 dark:text-primary-500 max-w-md">Get a detailed academic summary and AI-powered insights for {student.name}.</p>
                            </div>
                            <button 
                                onClick={() => handleViewReport(student.id)}
                                className="mt-3 sm:mt-0 flex-shrink-0 bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                            >
                                <DocumentTextIcon className="w-5 h-5" />
                                <span>View Report</span>
                            </button>
                        </div>
                    </DashboardSection>
                    <DashboardSection title="Assignment Status">
                        <ul className="divide-y divide-border-light">
                           {MOCK_SUBMISSIONS.map(sub => <AssignmentItem key={sub.id} submission={sub} />)}
                        </ul>
                    </DashboardSection>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <DashboardSection title="Recent Activity">
                         <ul className="divide-y divide-border-light">
                           {MOCK_ACTIVITIES.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
                        </ul>
                    </DashboardSection>
                    <DashboardSection title="Upcoming Events">
                        <ul className="divide-y divide-border-light">
                           {MOCK_EVENTS.map(event => <CalendarItem key={event.id} event={event} />)}
                        </ul>
                    </DashboardSection>
                </div>
            </div>
             {isReportModalOpen && (
                <ParentReportModal
                    isOpen={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                    student={student}
                    reportData={reportData.report}
                    insightsData={reportData.insights}
                    isLoading={isReportLoading}
                />
            )}
        </div>
    );
};

export default ParentOverview;