import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { CloseIcon, MicrophoneIcon, ListeningIcon, StopIcon, BulbIcon } from './Icons.tsx';

interface VoiceInputInterfaceProps {
    onClose: () => void;
    onSend: (transcript: string) => void;
    isLoading: boolean;
}

const VoiceInputInterface: React.FC<VoiceInputInterfaceProps> = ({ onClose, onSend, isLoading }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech Recognition is not supported in this browser.");
            setTranscript("Voice search is not supported on this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-ZA';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
            let interim_transcript = '';
            let final_transcript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            setTranscript(final_transcript || interim_transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error(`Speech recognition error: ${event.error}`);
            setIsListening(false);
        };
        
        recognitionRef.current = recognition;

        // Auto-start listening when component mounts
        startListening();

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListeningAndSend = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
        if (transcript.trim()) {
            onSend(transcript.trim());
        }
        onClose();
    };

    return (
      <div className="voice-search-container w-full">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-bg-tertiary z-10">
            <CloseIcon className="w-5 h-5" />
        </button>
        <div className="voice-search-header">
          <h3>Voice Search</h3>
          <p>Ask your question using voice</p>
        </div>
        
        <div className="voice-visualization-area">
          <div className={`mic-container ${isListening ? 'listening' : ''}`}>
            {isListening ? <ListeningIcon /> : <MicrophoneIcon />}
          </div>
          
          {isListening && (
            <div className="sound-waves">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          )}
        </div>
        
        <div className="transcript-display">
          {transcript || (isListening ? "Listening..." : "Tap the button to start speaking")}
        </div>
        
        <div className="voice-controls">
          <button
            className={`voice-btn ${isListening ? 'stop' : 'start'}`}
            onClick={isListening ? stopListeningAndSend : startListening}
            disabled={isLoading}
          >
            <span className="voice-btn-icon">
              {isListening ? <StopIcon /> : <MicrophoneIcon />}
            </span>
            <span className="voice-btn-text">
              {isListening ? 'Stop & Send' : 'Start Voice Search'}
            </span>
          </button>
        </div>
        
        <div className="voice-tips">
          <div className="tip-item">
            <BulbIcon />
            <span>Speak clearly and at a normal pace</span>
          </div>
          <div className="tip-item">
            <BulbIcon />
            <span>Ask specific questions for better results</span>
          </div>
        </div>
      </div>
    );
};

export default VoiceInputInterface;
