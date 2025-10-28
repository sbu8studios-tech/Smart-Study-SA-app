import React from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { StudentProfile, AcademicReport, AIInsight } from '../types';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { CloseIcon, AcademicCapIcon, BulbIcon } from './Icons';

interface ParentReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: StudentProfile;
    reportData: AcademicReport | null;
    insightsData: AIInsight | null;
    isLoading: boolean;
}

const ReportSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-bg-secondary p-4 rounded-lg">
        <h3 className="text-md font-bold text-text-primary flex items-center space-x-2 mb-2">
            {icon}
            <span>{title}</span>
        </h3>
        <div className="text-sm text-text-secondary space-y-2">
            {children}
        </div>
    </div>
);

const ParentReportModal: React.FC<ParentReportModalProps> = ({ isOpen, onClose, student, reportData, insightsData, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-modal flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-bg-primary rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-bg-primary p-4 border-b border-border-light flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold font-heading">Report for {student.name}</h2>
                        <p className="text-sm text-text-secondary">{student.grade} - Term 3 Summary</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-tertiary">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reportData && (
                                <ReportSection title="Academic Report" icon={<AcademicCapIcon className="w-5 h-5 text-primary-500" />}>
                                    <p><strong>Summary:</strong> {reportData.academicSummary}</p>
                                    <div>
                                        <strong>Teacher Comments:</strong>
                                        <ul className="list-disc list-inside ml-2">
                                            {reportData.teacherComments.map((comment, i) => <li key={i}>{comment}</li>)}
                                        </ul>
                                    </div>
                                    <p><strong>Attendance:</strong> {reportData.attendanceSummary.present} days present, {reportData.attendanceSummary.absent} days absent.</p>
                                    <div>
                                        <strong>Recommendations:</strong>
                                        <ul className="list-disc list-inside ml-2">
                                            {reportData.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                        </ul>
                                    </div>
                                </ReportSection>
                            )}
                            
                            {insightsData && (
                                <ReportSection title="AI-Powered Insights" icon={<BulbIcon className="w-5 h-5 text-warning-500" />}>
                                    <p><strong>Identified Learning Style:</strong> {insightsData.learningStyle}</p>
                                    <p><strong>Optimal Study Times:</strong> {insightsData.optimalStudyTimes}</p>
                                    <p><strong>Subject Affinity:</strong> {insightsData.subjectAffinity}</p>
                                </ReportSection>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.2s ease-out; }
            `}</style>
        </div>
    );
};

export default ParentReportModal;