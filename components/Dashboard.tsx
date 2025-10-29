import React, { useState } from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { Grade, Subject } from '../types.ts';
import { CURRICULUM_DATA, ALL_GRADES, FET_STREAMS } from '../constants.ts';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { BackIcon, ChevronRightIcon } from './Icons.tsx';

interface DashboardProps {
  onSelectSubject: (subject: Subject) => void;
}

const isFetGrade = (grade: Grade): boolean => {
  return ['Grade 10', 'Grade 11', 'Grade 12'].includes(grade);
};

const SubjectButton: React.FC<{subjectName: string, onClick: () => void}> = ({ subjectName, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full text-left p-4 font-semibold rounded-xl bg-bg-primary border border-border-light hover:bg-primary-600 hover:text-text-inverse hover:border-primary-600 transition-all duration-200 flex justify-between items-center group shadow-md hover:shadow-lg hover:-translate-y-1"
  >
    <span>{subjectName}</span>
    <span className="text-primary-500 group-hover:text-text-inverse transition-colors">
       <ChevronRightIcon className="w-5 h-5" />
    </span>
  </button>
);

const StreamSection: React.FC<{title: string, subjects: string[], allSubjects: string[], onSelect: (subject: string) => void}> = ({ title, subjects, allSubjects, onSelect }) => {
  const availableSubjects = subjects.filter(s => allSubjects.includes(s));
  if (availableSubjects.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-text-secondary mb-3 mt-4 font-heading">{title}</h3>
      <div className="flex flex-col space-y-3">
        {availableSubjects.map(subject => (
          <SubjectButton key={subject} subjectName={subject} onClick={() => onSelect(subject)} />
        ))}
      </div>
    </div>
  );
}


const Dashboard: React.FC<DashboardProps> = ({ onSelectSubject }) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
  };

  const handleSubjectSelect = (subjectName: string) => {
    if (selectedGrade) {
      onSelectSubject({ name: subjectName, grade: selectedGrade });
    }
  };

  const subjectsForGrade = selectedGrade ? CURRICULUM_DATA[selectedGrade] || [] : [];

  return (
    <div className="p-6">
      {!selectedGrade ? (
        <>
          <h2 className="text-2xl font-bold mb-1 font-heading">Hello!</h2>
          <p className="text-text-secondary mb-6">Please select your grade to begin.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ALL_GRADES.map(grade => (
              <button 
                key={grade} 
                onClick={() => handleGradeSelect(grade)}
                className="h-24 flex items-center justify-center text-center font-semibold rounded-xl bg-bg-primary border border-border-light hover:bg-primary-600 hover:text-text-inverse hover:border-primary-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                {grade}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <button onClick={() => setSelectedGrade(null)} className="mr-3 p-2 rounded-full hover:bg-bg-tertiary">
              <BackIcon className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold mb-1 font-heading">{selectedGrade}</h2>
              <p className="text-text-secondary">Now, choose a subject to start learning.</p>
            </div>
          </div>

          {subjectsForGrade.length > 0 ? (
            isFetGrade(selectedGrade) ? (
              <div>
                <StreamSection title="Compulsory Subjects" subjects={FET_STREAMS.compulsory} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
                <StreamSection title="Science Stream" subjects={FET_STREAMS.science} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
                <StreamSection title="Commerce Stream" subjects={FET_STREAMS.commerce} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
                <StreamSection title="Humanities Stream" subjects={FET_STREAMS.humanities} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
                <StreamSection title="Technical Stream" subjects={FET_STREAMS.technical} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
                <StreamSection title="Arts Stream" subjects={FET_STREAMS.arts} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
                <StreamSection title="Vocational Stream" subjects={FET_STREAMS.vocational} allSubjects={subjectsForGrade} onSelect={handleSubjectSelect} />
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                {subjectsForGrade.map(subjectName => (
                  <SubjectButton key={subjectName} subjectName={subjectName} onClick={() => handleSubjectSelect(subjectName)} />
                ))}
              </div>
            )
          ) : (
            <p className="text-text-secondary text-center py-8">No subjects available for this grade yet. Please check back later!</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
