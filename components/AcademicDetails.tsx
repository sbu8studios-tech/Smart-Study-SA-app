import React, { useState } from 'react';
import { StudentProfile } from '../types.ts';
import TimeRangeSelector from './TimeRangeSelector.tsx';
import PerformanceChart from './PerformanceChart.tsx';
import SubjectDetails from './SubjectDetails.tsx';
import CommentList from './CommentList.tsx';
import RecommendationList from './RecommendationList.tsx';
import { AcademicCapIcon, ChatBubbleIcon, BulbIcon } from './Icons.tsx';

// --- TYPE DEFINITIONS ---
type SubjectData = {
    id: string;
    name: string;
    grade: number;
    details: any;
};

interface AcademicDetailsProps {
    child: StudentProfile;
    progress: {
        performance: any;
        subjects: SubjectData[];
        comments: { teacher: string; comment: string; date: string }[];
        recommendations: string[];
    } | null;
}

// --- SUB-COMPONENTS ---

const SubjectCard: React.FC<{
    subject: SubjectData;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ subject, isSelected, onSelect }) => (
    <button
        onClick={onSelect}
        className={`bg-bg-primary p-4 rounded-xl border-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-1
            ${isSelected ? 'border-primary-500' : 'border-border-light'}`
        }
    >
        <h4 className="font-bold text-lg">{subject.name}</h4>
        <p className={`text-4xl font-bold font-heading mt-2 ${isSelected ? 'text-primary-600' : 'text-text-primary'}`}>
            {subject.grade}%
        </p>
    </button>
);

const DetailSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
        <h3 className="text-lg font-bold mb-3 font-heading flex items-center space-x-2">
            {icon}
            <span>{title}</span>
        </h3>
        {children}
    </div>
);


// --- MAIN COMPONENT ---

const AcademicDetails: React.FC<AcademicDetailsProps> = ({ child, progress }) => {
    const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
    const [timeRange, setTimeRange] = useState('month');

    if (!child || !progress) {
        return (
            <div className="text-center py-12">
                <p>Loading academic data for {child?.name}...</p>
            </div>
        );
    }
    
    return (
        <div className="academic-details space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading flex items-center">
                        <AcademicCapIcon className="w-7 h-7 mr-2 text-primary-500" />
                        Academic Performance
                    </h2>
                    <p className="text-text-secondary">An overview of {child.name}'s progress.</p>
                </div>
                <TimeRangeSelector
                    value={timeRange}
                    onChange={setTimeRange}
                    options={[
                        { value: 'week', label: 'This Week' },
                        { value: 'month', label: 'This Month' },
                        { value: 'term', label: 'This Term' }
                    ]}
                />
            </div>

            <DetailSection title="Overall Performance" icon={<div />}>
                <PerformanceChart data={progress.performance} timeRange={timeRange} />
            </DetailSection>

            <DetailSection title="Subject Breakdown" icon={<div />}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {progress.subjects?.map(subject => (
                        <SubjectCard
                            key={subject.id}
                            subject={subject}
                            isSelected={selectedSubject?.id === subject.id}
                            onSelect={() => setSelectedSubject(subject)}
                        />
                    ))}
                </div>
                {selectedSubject && (
                    <SubjectDetails subject={selectedSubject} timeRange={timeRange} />
                )}
            </DetailSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <DetailSection title="Teacher Feedback" icon={<ChatBubbleIcon className="w-5 h-5 text-primary-500" />}>
                    <CommentList comments={progress.comments} />
                </DetailSection>

                <DetailSection title="Learning Recommendations" icon={<BulbIcon className="w-5 h-5 text-warning-500" />}>
                    <RecommendationList recommendations={progress.recommendations} />
                </DetailSection>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default AcademicDetails;