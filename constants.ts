// FIX: Corrected import path for types.ts to be a relative path.
import { ChatMessage, MessageAuthor, Curriculum, Grade } from './types';

export const DEFAULT_LOGO_URL = 'data:image/svg+xml,%3csvg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"%3e%3cpath d="M50 90C65 90 85 75 85 60C85 45 65 50 50 65C35 50 15 45 15 60C15 75 35 90 50 90Z" fill="%2334A853"/%3e%3cpath d="M50 25L5 45L50 65L95 45L50 25Z" fill="%231A73E8"/%3e%3cpath d="M75 40V20C75 17.2386 72.7614 15 70 15H65" stroke="%23FF6B00" stroke-width="4" stroke-linecap="round"/%3e%3cpath d="M75 40L78 45" stroke="%23FF6B00" stroke-width="4" stroke-linecap="round"/%3e%3cpath d="M75 40L72 45" stroke="%23FF6B00" stroke-width="4" stroke-linecap="round"/%3e%3c/svg%3e';

export const ALL_GRADES: Grade[] = [
  'Grade R', 'Grade 1', 'Grade 2', 'Grade 3', 
  'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 
  'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

export const SOUTH_AFRICAN_LANGUAGES = [
  'Afrikaans', 'isiNdebele', 'isiXhosa', 'isiZulu',
  'Sepedi', 'Sesotho', 'Setswana',
  'siSwati', 'Tshivenda', 'Xitsonga'
];

export const CURRICULUM_DATA: Curriculum = {
  // Foundation Phase
  'Grade R': ['Home Language', 'Mathematics', 'Life Skills'],
  'Grade 1': ['Home Language', 'First Additional Language', 'Mathematics', 'Life Skills'],
  'Grade 2': ['Home Language', 'First Additional Language', 'Mathematics', 'Life Skills'],
  'Grade 3': ['Home Language', 'First Additional Language', 'Mathematics', 'Life Skills'],
  
  // Intermediate Phase
  'Grade 4': ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences & Technology', 'Social Sciences', 'Life Skills'],
  'Grade 5': ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences & Technology', 'Social Sciences', 'Life Skills'],
  'Grade 6': ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences & Technology', 'Social Sciences', 'Life Skills'],
  
  // Senior Phase
  'Grade 7': ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences', 'Social Sciences', 'Technology', 'Economic Management Sciences', 'Life Orientation', 'Creative Arts'],
  'Grade 8': ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences', 'Social Sciences', 'Technology', 'Economic Management Sciences', 'Life Orientation', 'Creative Arts'],
  'Grade 9': ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences', 'Social Sciences', 'Technology', 'Economic Management Sciences', 'Life Orientation', 'Creative Arts'],

  // FET Phase
  'Grade 10': [
    // Compulsory
    'Home Language', 'First Additional Language', 'Mathematics', 'Mathematical Literacy', 'Life Orientation',
    // Electives
    'Physical Sciences', 'Life Sciences', 'Computer Applications Technology',
    'Accounting', 'Business Studies', 'Economics',
    'Geography', 'History', 'Tourism', 'Religion Studies',
    'Engineering Graphics and Design', 'Civil Technology', 'Mechanical Technology',
    'Visual Arts', 'Dramatic Arts', 'Music',
    'Consumer Studies', 'Hospitality Studies', 'Agricultural Sciences'
  ],
  'Grade 11': [
    'Home Language', 'First Additional Language', 'Mathematics', 'Mathematical Literacy', 'Life Orientation',
    'Physical Sciences', 'Life Sciences', 'Computer Applications Technology',
    'Accounting', 'Business Studies', 'Economics',
    'Geography', 'History', 'Tourism', 'Religion Studies',
    'Engineering Graphics and Design', 'Civil Technology', 'Mechanical Technology',
    'Visual Arts', 'Dramatic Arts', 'Music',
    'Consumer Studies', 'Hospitality Studies', 'Agricultural Sciences'
  ],
  'Grade 12': [
    'Home Language', 'First Additional Language', 'Mathematics', 'Mathematical Literacy', 'Life Orientation',
    'Physical Sciences', 'Life Sciences', 'Computer Applications Technology',
    'Accounting', 'Business Studies', 'Economics',
    'Geography', 'History', 'Tourism', 'Religion Studies',
    'Engineering Graphics and Design', 'Civil Technology', 'Mechanical Technology',
    'Visual Arts', 'Dramatic Arts', 'Music',
    'Consumer Studies', 'Hospitality Studies', 'Agricultural Sciences'
  ],
};

export const FET_STREAMS = {
  compulsory: ['Home Language', 'First Additional Language', 'Mathematics', 'Mathematical Literacy', 'Life Orientation'],
  science: ['Physical Sciences', 'Life Sciences', 'Computer Applications Technology', 'Agricultural Sciences'],
  commerce: ['Accounting', 'Business Studies', 'Economics'],
  humanities: ['Geography', 'History', 'Tourism', 'Religion Studies'],
  technical: ['Engineering Graphics and Design', 'Civil Technology', 'Mechanical Technology'],
  arts: ['Visual Arts', 'Dramatic Arts', 'Music'],
  vocational: ['Consumer Studies', 'Hospitality Studies'],
};


export const TUTOR_PROMPT_TEMPLATE_BASE = `
You are "Thuba," an expert AI tutor for the South African CAPS curriculum. Your goal is to help students understand concepts deeply, not just give them the answer.
Always respond in the specified JSON format. Never deviate.

GUIDING PRINCIPLES:
1.  **Socratic Method:** Guide students with questions. If a student asks "how do I solve 2x + 5 = 15?", ask them "What's the first step you think we should take to get 'x' by itself?".
2.  **Step-by-Step Breakdown:** When a student is completely stuck, provide a clear, step-by-step solution. Each step must have a simple 'title' and a concise 'explanation'.
3.  **Encourage and Motivate:** Use positive language. "Great question!", "That's a good start!", "Let's try that together."
4.  **Context is Key:** Remember the student's grade and subject. A Grade 10 explanation for algebra is different from a Grade 7 one.
5.  **Generate Suggestions:** Always provide 3 relevant, engaging 'suggestedQuestions' to guide the learning journey. These should be questions the student might ask next, like "Can you explain that concept differently?", "Give me a practice problem", or "How does this apply in real life?".
6.  **Safety & Guardrails:** Never respond to inappropriate, off-topic, or harmful questions. Politely redirect back to the subject matter. Your response should be:
    {
      "mainResponse": "I can only help with school subjects. Let's get back to learning!",
      "steps": [],
      "suggestedQuestions": ["Let's try a math problem.", "What topic are you studying?", "Ask me a science question."]
    }

JSON RESPONSE STRUCTURE (Strictly Enforced):
You MUST respond with a JSON object with these exact keys: 'mainResponse', 'steps', 'suggestedQuestions'.
- "mainResponse": (String) Your primary conversational response to the student.
- "steps": (Array of Objects) Each object has "title" (String) and "explanation" (String). This array is for breaking down a solution. It can be empty if you're just having a conversation.
- "suggestedQuestions": (Array of Strings) Exactly 3 follow-up questions the student might ask.
`;

export const FINE_TUNING_EXAMPLES = `
---
EXAMPLE 1: Student asks for a direct answer.
USER: "What is the powerhouse of the cell?"
AI_RESPONSE:
{
  "mainResponse": "That's a great question! It's a very important part of the cell. Do you have any initial thoughts on what it might be?",
  "steps": [],
  "suggestedQuestions": ["Give me a hint.", "Where is it located in the cell?", "Why is it important?"]
}

---
EXAMPLE 2: Student is stuck on a math problem.
USER: "I don't know how to solve for x in 3x - 4 = 11"
AI_RESPONSE:
{
  "mainResponse": "No problem, let's break it down together! The goal is to get 'x' all by itself on one side of the equals sign. What do you think is the first thing we should do to the '-4'?",
  "steps": [
    {
      "title": "Step 1: Isolate the 'x' term",
      "explanation": "To get the '3x' part by itself, we need to move the '-4'. We do the opposite operation, so we add 4 to both sides of the equation. This gives us 3x = 15."
    },
    {
      "title": "Step 2: Solve for x",
      "explanation": "Now, 'x' is being multiplied by 3. To undo this, we do the opposite: divide both sides by 3. This leaves us with x = 5."
    }
  ],
  "suggestedQuestions": ["Why do we have to do it to both sides?", "Can we do another problem like this?", "Where would I use this in real life?"]
}
---
`;

const initialMessageText = (subjectName: string) => `Hi there! I'm Thuba, your personal AI tutor. I'm ready to help you with ${subjectName}. What topic are you working on today?`;

export const getInitialMessageForSubject = (subjectName: string): ChatMessage => ({
  id: `ai-initial-${Date.now()}`,
  author: MessageAuthor.AI,
  text: initialMessageText(subjectName),
  originalText: initialMessageText(subjectName),
  suggestedQuestions: [
    `Help me with my homework.`,
    `Explain a topic I'm struggling with.`,
    `Give me some practice questions.`
  ]
});