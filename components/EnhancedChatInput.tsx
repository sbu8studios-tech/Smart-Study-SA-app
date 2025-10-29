import React, { useState, useRef } from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { SendIcon, VoiceSearchIcon, AttachmentIcon, KeyboardIcon, CloseIcon } from './Icons.tsx';
import VoiceInputInterface from './VoiceInputInterface.tsx';
import FileUploadInterface from './FileUploadInterface.tsx';

type InputMode = 'text' | 'voice' | 'file';

interface EnhancedChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isLoading: boolean;
}

const ModeButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isActive ? 'bg-primary-600 text-text-inverse' : 'text-text-secondary hover:bg-bg-tertiary'}`}
    >
        {icon}
    </button>
);

const EnhancedChatInput: React.FC<EnhancedChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [inputMode, setInputMode] = useState<InputMode>('text');
    const [text, setText] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };
    
    const handleFilesSelect = (files: File[]) => {
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveFile = (fileToRemove: File) => {
        setUploadedFiles(prev => prev.filter(file => file !== fileToRemove));
    };

    const handleSend = () => {
        if ((text.trim() || uploadedFiles.length > 0) && !isLoading) {
            onSendMessage(text, uploadedFiles);
            setText('');
            setUploadedFiles([]);
            setInputMode('text');
             if (textAreaRef.current) {
                textAreaRef.current.style.height = 'auto';
            }
        }
    };
    
    const handleVoiceSend = (transcript: string) => {
      setInputMode('text');
      if (transcript.trim() && !isLoading) {
          onSendMessage(transcript);
      }
    };
    
    const renderInputArea = () => {
        switch (inputMode) {
            case 'voice':
                return <VoiceInputInterface onClose={() => setInputMode('text')} onSend={handleVoiceSend} isLoading={isLoading} />;
            case 'file':
                return <FileUploadInterface uploadedFiles={uploadedFiles} onFilesSelect={handleFilesSelect} onRemoveFile={handleRemoveFile} />;
            case 'text':
            default:
                return (
                    <textarea
                        ref={textAreaRef}
                        value={text}
                        onChange={handleTextChange}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder="Ask me anything..."
                        rows={1}
                        className="w-full h-auto max-h-48 resize-none bg-transparent focus:outline-none text-base px-2 text-text-primary"
                        disabled={isLoading}
                    />
                );
        }
    };

    return (
        <div className="flex-shrink-0 bg-bg-primary border-t border-border-light shadow-lg">
            <div className="p-4 flex items-end space-x-3">
                <div className="flex flex-col space-y-2">
                    <ModeButton icon={<KeyboardIcon className="w-6 h-6" />} label="Text input" isActive={inputMode === 'text'} onClick={() => setInputMode('text')} />
                    <ModeButton icon={<VoiceSearchIcon className="w-6 h-6" />} label="Voice input" isActive={inputMode === 'voice'} onClick={() => setInputMode('voice')} />
                    <ModeButton icon={<AttachmentIcon className="w-6 h-6" />} label="File upload" isActive={inputMode === 'file'} onClick={() => setInputMode('file')} />
                </div>
                
                <div className="flex-grow flex items-end p-2 bg-bg-secondary rounded-2xl border border-border-medium focus-within:ring-2 focus-within:ring-primary-500 min-h-[56px]">
                    {renderInputArea()}
                </div>

                <button onClick={handleSend} disabled={isLoading || (!text.trim() && uploadedFiles.length === 0)} className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary-600 rounded-full text-text-inverse hover:bg-primary-700 disabled:bg-primary-500/50 disabled:cursor-not-allowed transition-colors">
                    <SendIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default EnhancedChatInput;
