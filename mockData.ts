// FIX: Replaced placeholder content with actual mock data.
import { StudentProfile, Classroom, Assignment, Activity, StudentSubmission, CalendarEvent, User, UserRole, Grade } from './types.ts';

export const MOCK_STUDENT_PROFILES: StudentProfile[] = [
    {
        id: 'student-1',
        name: 'Alex Smith',
        grade: 'Grade 10',
        avatarUrl: 'https://i.pravatar.cc/150?u=alexsmith',
        overallPerformance: 88,
        parentalControls: {
            studyTime: { weekdays: 120, weekends: 180 },
            notifications: { grades: true, attendance: true, assignments: false }
        }
    },
];

export const MOCK_PROGRESS_DATA = {
    'student-1': {
        performance: { /* structured data for charts */ },
        subjects: [
            { id: 'math-10', name: 'Mathematics', grade: 92, details: { avgTestScore: 90, homeworkCompletion: 95, participation: 'High', nextTest: '2024-09-15' } },
            { id: 'sci-10', name: 'Physical Sciences', grade: 85, details: { avgTestScore: 82, homeworkCompletion: 90, participation: 'Medium', nextTest: '2024-09-18' } },
            { id: 'eng-10', name: 'English HL', grade: 87, details: { avgTestScore: 88, homeworkCompletion: 98, participation: 'High', nextTest: '2024-09-12' } },
            { id: 'hist-10', name: 'History', grade: 89, details: { avgTestScore: 91, homeworkCompletion: 100, participation: 'Medium', nextTest: '2024-09-20' } },
        ],
        comments: [
            { teacher: 'Mr. Davis', comment: 'Excellent work in Algebra.', date: '2024-08-15' },
            { teacher: 'Ms. Adams', comment: 'Strong analytical skills in literature.', date: '2024-08-12' },
        ],
        recommendations: [
            'Review trigonometry concepts weekly.',
            'Utilize visual aids for Life Sciences.'
        ]
    }
};

export const MOCK_CLASSROOMS: Classroom[] = [
    { id: 'class-1', name: 'Grade 10 Maths', grade: 'Grade 10', studentCount: 30 },
    { id: 'class-2', name: 'Grade 10 Science', grade: 'Grade 10', studentCount: 28 },
    { id: 'class-3', name: 'Grade 11 English', grade: 'Grade 11', studentCount: 25 },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
    { id: 'assign-1', title: 'Algebra Worksheet 3', className: 'Grade 10 Maths', dueDate: '2024-09-10', totalSubmissions: 30, gradedSubmissions: 15 },
    { id: 'assign-2', title: 'Newton\'s Laws Lab', className: 'Grade 10 Science', dueDate: '2024-09-12', totalSubmissions: 28, gradedSubmissions: 28 },
    { id: 'assign-3', title: 'Shakespeare Essay', className: 'Grade 11 English', dueDate: '2024-09-15', totalSubmissions: 25, gradedSubmissions: 5 },
];

export const MOCK_ACTIVITIES: Activity[] = [
    { id: 'act-1', type: 'grade', description: 'Grade posted for Algebra Worksheet 2.', timestamp: '2 hours ago' },
    { id: 'act-2', type: 'assignment', description: 'New assignment: Newton\'s Laws Lab.', timestamp: '1 day ago' },
    { id: 'act-3', type: 'login', description: 'Alex Smith logged in.', timestamp: '3 days ago' },
];

export const MOCK_SUBMISSIONS: StudentSubmission[] = [
    { id: 'sub-1', assignmentTitle: 'Algebra Worksheet 2', status: 'Graded', grade: 95 },
    { id: 'sub-2', assignmentTitle: 'History Essay', status: 'Submitted', grade: null },
    { id: 'sub-3', assignmentTitle: 'Poetry Analysis', status: 'Overdue', grade: null },
];

export const MOCK_EVENTS: CalendarEvent[] = [
    { id: 'event-1', title: 'Mathematics Test', date: '2024-09-15', type: 'class' },
    { id: 'event-2', title: 'Parent-Teacher Meetings', date: '2024-09-20', type: 'school' },
];

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alex Smith', email: 'alex.smith@example.com', role: UserRole.STUDENT },
  { id: 'user-2', name: 'Brenda Smith', email: 'brenda.smith@example.com', role: UserRole.PARENT },
  { id: 'user-3', name: 'Charles Davis', email: 'c.davis@school.com', role: UserRole.TEACHER },
  { id: 'user-4', name: 'Diana Prince', email: 'd.prince@schooldistrict.com', role: UserRole.ADMIN },
  { id: 'user-5', name: 'Ethan Hunt', email: 'e.hunt@example.com', role: UserRole.STUDENT },
  { id: 'user-6', name: 'Fiona Glenanne', email: 'f.glenanne@example.com', role: UserRole.STUDENT },
];
