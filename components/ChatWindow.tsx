import React, { useRef, useEffect } from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import type { ChatMessage } from '../types.ts';
import MessageBubble from './MessageBubble.tsx';
import TypingIndicator from './TypingIndicator.tsx';
import SuggestedQuestions from './SuggestedQuestions.tsx';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSuggestedQuestion: (question: string) => void;
  onTranslateMessage: (messageId: string, language: string) => void;
  onRevertTranslation: (messageId: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSuggestedQuestion, onTranslateMessage, onRevertTranslation }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  
  const lastMessage = messages[messages.length - 1];

  return (
    <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto" role="log" aria-live="polite">
      <div className="flex flex-col space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onTranslate={onTranslateMessage} onRevert={onRevertTranslation} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      {!isLoading && lastMessage?.author === 'ai' && lastMessage.suggestedQuestions && lastMessage.suggestedQuestions.length > 0 && (
         <SuggestedQuestions 
          questions={lastMessage.suggestedQuestions} 
          onQuestionClick={onSuggestedQuestion} 
        />
      )}
    </div>
  );
};

export default ChatWindow;
