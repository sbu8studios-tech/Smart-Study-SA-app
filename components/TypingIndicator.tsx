import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="p-3 rounded-xl bg-bg-tertiary self-start shadow-md">
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 bg-text-tertiary rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;