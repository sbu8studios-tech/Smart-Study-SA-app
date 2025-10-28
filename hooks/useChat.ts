import { useState, useCallback } from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { ChatMessage, MessageAuthor, Subject, FileAttachment } from '../types';
import { getInitialMessageForSubject } from '../constants.ts';
import { getTutorResponse, translateText } from '../services/geminiService.ts';

const useChat = (subject: Subject) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    getInitialMessageForSubject(subject.name),
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string, files?: File[] | null) => {
      if (!text.trim() && (!files || files.length === 0)) return;

      const fileAttachments: FileAttachment[] = files 
        ? files.map(file => ({
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file), // Create a temporary local URL for display
          }))
        : [];

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        author: MessageAuthor.USER,
        text,
        originalText: text,
        files: fileAttachments,
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);

      try {
        const aiResponse = await getTutorResponse(messages, subject, text, files);
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error('Failed to get AI response:', error);
        const errorText = 'Oops! Something went wrong. Please try again.';
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          author: MessageAuthor.AI,
          text: errorText,
          originalText: errorText,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, subject]
  );
  
  const translateMessage = useCallback(
    async (messageId: string, language: string) => {
      const messageIndex = messages.findIndex(m => m.id === messageId);
      if (messageIndex === -1) return;

      const originalMessage = messages[messageIndex];
      const textToTranslate = originalMessage.originalText || originalMessage.text;

      // Optimistically update UI to show translating status
      const tempMessages = [...messages];
      tempMessages[messageIndex] = { ...originalMessage, text: `Translating to ${language}...` };
      setMessages(tempMessages);

      try {
        const translatedText = await translateText(textToTranslate, language);
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const msgIndex = newMessages.findIndex(m => m.id === messageId);
          if (msgIndex !== -1) {
            newMessages[msgIndex] = { ...newMessages[msgIndex], text: translatedText };
          }
          return newMessages;
        });
      } catch (error) {
        console.error(`Translation failed for message ${messageId}:`, error);
        // Revert to the original message on failure
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
           const msgIndex = newMessages.findIndex(m => m.id === messageId);
          if (msgIndex !== -1) {
             newMessages[msgIndex] = originalMessage;
          }
          return newMessages;
        });
      }
    },
    [messages]
  );
  
  const revertToOriginal = useCallback((messageId: string) => {
    setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        const msgIndex = newMessages.findIndex(m => m.id === messageId);
        if (msgIndex !== -1 && newMessages[msgIndex].originalText) {
            newMessages[msgIndex].text = newMessages[msgIndex].originalText!;
        }
        return newMessages;
    });
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    translateMessage,
    revertToOriginal,
  };
};

export default useChat;