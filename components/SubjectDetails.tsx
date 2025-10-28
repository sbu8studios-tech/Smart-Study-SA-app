import React from 'react';

interface SubjectDetailsProps {
    subject: { name: string; grade: number; details: any }; // Mock details
    timeRange: string;
}

const DetailCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-bg-secondary p-3 rounded-lg text-center sm:text-left">
        <p className="text-xs text-text-secondary font-bold uppercase">{label}</p>
        <p className="text-xl font-semibold text-text-primary">{value}</p>
    </div>
);

const SubjectDetails: React.FC<SubjectDetailsProps> = ({ subject, timeRange }) => {
    // This is a placeholder showing more detailed info for a selected subject
    return (
        <div className="bg-bg-primary p-4 mt-6 rounded-xl border-2 border-primary-500 shadow-lg animate-fade-in">
            <h4 className="text-lg font-bold mb-3">Details for {subject.name} (This {timeRange})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DetailCard label="Avg. Test Score" value={`${subject.details.avgTestScore}%`} />
                <DetailCard label="Homework Completion" value={`${subject.details.homeworkCompletion}%`} />
                <DetailCard label="Class Participation" value={subject.details.participation} />
                <DetailCard label="Next Test Date" value={subject.details.nextTest} />
            </div>
        </div>
    );
};

export default SubjectDetails;