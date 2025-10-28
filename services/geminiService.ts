import { GoogleGenAI, GenerateContentResponse, Part, Type } from "@google/genai";
// FIX: Corrected import path for types.ts to be a relative path.
import { ChatMessage, MessageAuthor, Subject } from '../types';
import { TUTOR_PROMPT_TEMPLATE_BASE, FINE_TUNING_EXAMPLES } from '../constants.ts';

// Per instructions, API_KEY is available as process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Converts a File object to a GoogleGenAI.Part object for multi-modal input.
 * @param file The file to convert.
 * @returns A promise that resolves to a Part object.
 */
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (reader.result) {
            resolve((reader.result as string).split(',')[1]);
        } else {
            reject(new Error("Failed to read file."));
        }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      mimeType: file.type,
      data: base64EncodedData,
    },
  };
};

// Define the expected JSON schema for the tutor response.
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        mainResponse: { type: Type.STRING },
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                },
                required: ['title', 'explanation']
            }
        },
        suggestedQuestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
    },
    required: ['mainResponse', 'steps', 'suggestedQuestions']
};


/**
 * Gets a response from the AI tutor model.
 * @param chatHistory The chat history before the current user message.
 * @param subject The current subject context.
 * @param newQuery The new text query from the user.
 * @param files Optional files attached to the new query.
 * @returns A promise that resolves to a ChatMessage from the AI.
 */
export const getTutorResponse = async (
  chatHistory: ChatMessage[],
  subject: Subject,
  newQuery: string,
  files?: File[] | null
): Promise<ChatMessage> => {
  try {
    const systemInstruction = `
      ${TUTOR_PROMPT_TEMPLATE_BASE}
      The student is in ${subject.grade} and is studying ${subject.name}. Tailor your explanation to this level.
      ${FINE_TUNING_EXAMPLES}
    `;

    // Convert chat history for the API.
    const history = chatHistory.map(message => ({
        role: message.author === MessageAuthor.USER ? 'user' : 'model',
        parts: [{ text: message.text }]
    }));
    
    // Prepare the user's prompt, making it clear when files are included.
    let userPrompt = newQuery;
    if (files && files.length > 0) {
        const fileNames = files.map(f => f.name).join(', ');
        userPrompt = `User question: "${newQuery}". Please analyze the attached file(s) (${fileNames}) to answer the user's question.`;
    }

    // Prepare the latest user message with text and any files.
    const latestUserParts: Part[] = [{ text: userPrompt }];
    if (files && files.length > 0) {
        const fileParts = await Promise.all(files.map(fileToGenerativePart));
        latestUserParts.push(...fileParts);
    }
    
    // The full content for the API call includes history and the new user turn.
    const contents = [
        ...history,
        {
            role: 'user',
            parts: latestUserParts
        }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema
      }
    });

    const textResponse = response.text;
    let parsedResponse;
    try {
        parsedResponse = JSON.parse(textResponse);
    } catch (e) {
        console.error("Failed to parse JSON response from AI:", textResponse);
        throw new Error("AI returned an invalid response format.");
    }

    const mainResponseText = parsedResponse.mainResponse || "I'm not sure how to respond to that. Can you ask another way?";
    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      author: MessageAuthor.AI,
      text: mainResponseText,
      originalText: mainResponseText, // Store the original untranslated text
      steps: parsedResponse.steps || [],
      suggestedQuestions: parsedResponse.suggestedQuestions || [],
    };
    return aiMessage;

  } catch (error) {
    console.error('Error getting AI response from Gemini:', error);
    // Re-throw a generic error to be handled by the UI component.
    throw new Error("Failed to get AI response.");
  }
};

/**
 * Translates a given text to a target language.
 * @param textToTranslate The text to translate.
 * @param targetLanguage The language to translate into (e.g., 'isiZulu').
 * @returns A promise that resolves to the translated text.
 */
export const translateText = async (
  textToTranslate: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const prompt = `You are a professional translator. Translate the following English text into ${targetLanguage}. Provide only the translation, with no extra commentary or explanations.
    
    Text to translate:
    "${textToTranslate}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error(`Error translating text to ${targetLanguage}:`, error);
    throw new Error("Translation failed.");
  }
};