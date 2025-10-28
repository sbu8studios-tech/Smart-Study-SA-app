import React from 'react';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onQuestionClick }) => {
  return (
    <div className="mt-6 flex flex-col items-start space-y-3">
        {questions.map((q, index) => (
            <button
                key={index}
                onClick={() => onQuestionClick(q)}
                className="text-base font-semibold text-primary-600 dark:text-primary-500 bg-primary-50 dark:bg-primary-500/10 border border-primary-500/20 rounded-full px-5 py-2.5 hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-transform duration-200 ease-in-out hover:scale-105 text-left"
            >
                {q}
            </button>
        ))}
    </div>
  );
};

export default SuggestedQuestions;