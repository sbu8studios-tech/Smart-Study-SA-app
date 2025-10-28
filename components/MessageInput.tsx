import React, { useState, useRef } from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { SendIcon } from './Icons';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    // Auto-resize textarea
    if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
       if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-shrink-0 p-4 bg-bg-primary border-t border-border-light">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-grow flex items-end p-2 bg-bg-secondary rounded-2xl border border-border-medium focus-within:ring-2 focus-within:ring-primary-500">
            <textarea
                ref={textAreaRef}
                value={text}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                className="w-full h-auto max-h-48 resize-none bg-transparent focus:outline-none text-base px-2 text-text-primary"
                disabled={isLoading}
            />
        </div>
        <button type="submit" disabled={isLoading || !text.trim()} className="w-12 h-12 flex items-center justify-center bg-primary-600 rounded-full text-text-inverse hover:bg-primary-700 disabled:bg-primary-600/50 disabled:cursor-not-allowed transition-colors">
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;