import React from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { ChatMessage, MessageAuthor, FileAttachment as FileAttachmentType } from '../types';
import { SOUTH_AFRICAN_LANGUAGES } from '../constants.ts';
import StepByStepSolution from './StepByStepSolution.tsx';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { TranslateIcon, FileIcon, ImageIcon } from './Icons';

interface MessageBubbleProps {
  message: ChatMessage;
  onTranslate: (messageId: string, language: string) => void;
  onRevert: (messageId: string) => void;
}

const LanguageMenu: React.FC<{ onSelect: (lang: string) => void; onRevert: () => void; }> = ({ onSelect, onRevert }) => {
    return (
        <div className="absolute bottom-full mb-2 right-0 w-80 bg-bg-primary rounded-lg shadow-xl border border-border-light z-popover p-2 origin-bottom-right animate-fade-in-up">
            <div className="grid grid-cols-2 gap-1">
                 <button 
                    onClick={onRevert}
                    className="w-full text-left px-3 py-2 text-sm rounded-md font-semibold text-primary-500 hover:bg-bg-tertiary col-span-2"
                >
                    English (Original)
                </button>
                {SOUTH_AFRICAN_LANGUAGES.map(lang => (
                    <button 
                        key={lang} 
                        onClick={() => onSelect(lang)}
                        className="w-full text-left px-3 py-2 text-sm rounded-md text-text-primary hover:bg-bg-tertiary"
                    >
                        {lang}
                    </button>
                ))}
            </div>
             <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(10px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.15s ease-out;
                }
            `}</style>
        </div>
    );
};

const FileAttachment: React.FC<{ file: FileAttachmentType }> = ({ file }) => {
    const isImage = file.type.startsWith('image/');
    return (
        <div>
            {isImage ? (
                <img src={file.url} alt={file.name} className="rounded-lg max-w-xs max-h-64 object-cover border border-border-light" />
            ) : (
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-bg-primary/50 dark:bg-bg-tertiary/50">
                    <FileIcon className="w-6 h-6 flex-shrink-0 text-text-secondary" />
                    <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
            )}
        </div>
    );
};


const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onTranslate, onRevert }) => {
  const isAI = message.author === MessageAuthor.AI;
  const [showTranslateMenu, setShowTranslateMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowTranslateMenu(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTranslateSelect = (lang: string) => {
    onTranslate(message.id, lang);
    setShowTranslateMenu(false);
  };
  
  const handleRevert = () => {
    onRevert(message.id);
    setShowTranslateMenu(false);
  }

  const hasFiles = message.files && message.files.length > 0;
  const hasContent = message.text || hasFiles;

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      {hasContent && (
        <div className={`max-w-xl lg:max-w-2xl px-5 py-3.5 rounded-xl shadow-md ${isAI ? 'bg-bg-tertiary text-text-primary rounded-bl-none' : 'bg-primary-600 text-text-inverse rounded-br-none'}`}>
            {hasFiles && (
              <div className="flex flex-col gap-2.5">
                {message.files!.map((file, index) => <FileAttachment key={index} file={file} />)}
              </div>
            )}
            {message.text && <p className={`whitespace-pre-wrap text-base ${hasFiles ? 'mt-2.5' : ''}`}>{message.text}</p>}
            
            {message.steps && message.steps.length > 0 && (
            <div className="mt-4">
                <StepByStepSolution steps={message.steps} />
            </div>
            )}
            {isAI && message.originalText && (
                <div className="relative flex justify-end mt-2" ref={menuRef}>
                    <button 
                        onClick={() => setShowTranslateMenu(!showTranslateMenu)} 
                        className="flex items-center space-x-1.5 text-xs font-semibold text-text-secondary hover:text-primary-500 transition-colors px-2 py-1 rounded-md" 
                        aria-label="Translate message"
                        aria-haspopup="true"
                        aria-expanded={showTranslateMenu}
                    >
                        <TranslateIcon className="w-4 h-4" />
                        <span>Translate / Vertaal</span>
                    </button>
                    {showTranslateMenu && <LanguageMenu onSelect={handleTranslateSelect} onRevert={handleRevert} />}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;