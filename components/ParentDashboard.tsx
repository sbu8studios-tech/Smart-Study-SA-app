import React, { useState } from 'react';
// FIX: Corrected import path for mockData.ts to be a relative path.
import { MOCK_STUDENT_PROFILES, MOCK_PROGRESS_DATA } from '../mockData';
// FIX: Corrected import path for types.ts to be a relative path.
import { StudentProfile } from '../types';
import ParentNavigation from './ParentNavigation.tsx';
import ParentOverview from './ParentOverview.tsx';
import AcademicDetails from './AcademicDetails.tsx';
import AttendanceDetails from './AttendanceDetails.tsx';
import ParentCommunications from './ParentCommunications.tsx';
import Payments from './Payments.tsx';
import ParentalControls from './ParentalControls.tsx';

type ParentView = 'overview' | 'academics' | 'attendance' | 'communications' | 'payments' | 'settings';

const ParentDashboard: React.FC = () => {
    // In a real app, you'd select from multiple children. Here we just use the first.
    const [selectedChild] = useState<StudentProfile | null>(MOCK_STUDENT_PROFILES[0] || null);
    const [activeView, setActiveView] = useState<ParentView>('overview');
    
    // Mock data for academic details, would be fetched via service
    const mockProgressData = MOCK_PROGRESS_DATA;

    const renderContent = () => {
        if (!selectedChild) {
            return <div className="p-6 text-center">No student profiles found.</div>;
        }

        switch (activeView) {
            case 'overview':
                return <ParentOverview student={selectedChild} />;
            case 'academics':
                return <AcademicDetails child={selectedChild} progress={mockProgressData[selectedChild.id]} />;
            case 'attendance':
                return <AttendanceDetails student={selectedChild} />;
            case 'communications':
                return <ParentCommunications student={selectedChild} />;
            case 'payments':
                return <Payments student={selectedChild} />;
            case 'settings':
                return <ParentalControls child={selectedChild} onUpdate={() => console.log('Settings updated!')} />;
            default:
                return <ParentOverview student={selectedChild} />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <ParentNavigation activeView={activeView} onNavigate={setActiveView} />
            <main className="flex-grow p-6 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default ParentDashboard;