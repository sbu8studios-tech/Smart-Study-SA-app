// FIX: Replaced placeholder content with actual type definitions.
export enum UserRole {
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type Grade = 
  | 'Grade R' | 'Grade 1' | 'Grade 2' | 'Grade 3'
  | 'Grade 4' | 'Grade 5' | 'Grade 6' | 'Grade 7'
  | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

export interface Subject {
  name: string;
  grade: Grade;
}

export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface Step {
  title: string;
  explanation: string;
}

export interface FileAttachment {
  name: string;
  type: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  text: string;
  originalText: string;
  steps?: Step[];
  suggestedQuestions?: string[];
  files?: FileAttachment[];
}

export type Curriculum = {
  [key in Grade]: string[];
};

export interface ParentalControls {
    studyTime: {
        weekdays: number;
        weekends: number;
    };
    notifications: {
        grades: boolean;
        attendance: boolean;
        assignments: boolean;
    };
}

export interface StudentProfile {
    id: string;
    name: string;
    grade: Grade;
    avatarUrl?: string;
    overallPerformance: number;
    parentalControls: ParentalControls;
}

export interface Classroom {
    id: string;
    name: string;
    grade: Grade;
    studentCount: number;
}

export interface Assignment {
    id: string;
    title: string;
    className: string;
    dueDate: string;
    totalSubmissions: number;
    gradedSubmissions: number;
}

export interface Activity {
    id: string;
    type: 'grade' | 'assignment' | 'login';
    description: string;
    timestamp: string;
}

export interface StudentSubmission {
    id: string;
    assignmentTitle: string;
    status: 'Graded' | 'Submitted' | 'Overdue';
    grade: number | null;
}

export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    type: 'school' | 'class';
}

export interface AcademicReport {
    academicSummary: string;
    teacherComments: string[];
    attendanceSummary: { present: number; absent: number };
    recommendations: string[];
}

export interface AIInsight {
    learningStyle: 'Visual' | 'Auditory' | 'Kinesthetic' | 'Reading/Writing';
    optimalStudyTimes: string;
    subjectAffinity: string;
}

export interface AdminStats {
  totalStudents: number;
  totalTeachers: number;
  activeClasses: number;
}

export interface PlatformAnalytics {
  userEngagement: { dailyActiveUsers: number, sessionDuration: string };
  performanceMetrics: { avgApiLatency: string, uptime: string };
  revenueAnalytics: { mrr: number, churnRate: string };
  featureUsage: Record<string, string>;
}
