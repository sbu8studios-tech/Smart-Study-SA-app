// FIX: Replaced placeholder content with a full Admin Dashboard component implementation.
import React, { useState } from 'react';
import { MOCK_USERS } from '../mockData';
import { AdminStats, User } from '../types';
import SystemOverview from './SystemOverview';
import UserManagement from './UserManagement';
import SchoolManagement from './SchoolManagement';
import ContentManagement from './ContentManagement';
import BillingSubscriptions from './BillingSubscriptions';
import AdvancedAnalytics from './AdvancedAnalytics';
import ReportsCompliance from './ReportsCompliance';
import SystemSettings from './SystemSettings';
import { DashboardIcon, UsersIcon, SchoolIcon, LibraryIcon, CreditCardIcon, AnalyticsIcon, DocumentTextIcon, SettingsIcon } from './Icons';

type AdminView = 'overview' | 'users' | 'schools' | 'content' | 'billing' | 'analytics' | 'reports' | 'settings';

const NavButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full space-x-3 p-3 rounded-lg font-semibold text-left transition-colors
            ${isActive
                ? 'bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500'
                : 'text-text-primary hover:bg-bg-tertiary'
            }`}
    >
        {icon}
        <span className="hidden lg:inline">{label}</span>
    </button>
);

const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<AdminView>('overview');
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    
    // Mock data, would be fetched from services in a real app
    const adminStats: AdminStats = {
        totalStudents: 1250,
        totalTeachers: 75,
        activeClasses: 210,
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: <DashboardIcon className="w-5 h-5" /> },
        { id: 'users', label: 'Users', icon: <UsersIcon className="w-5 h-5" /> },
        { id: 'schools', label: 'Schools', icon: <SchoolIcon className="w-5 h-5" /> },
        { id: 'content', label: 'Content', icon: <LibraryIcon className="w-5 h-5" /> },
        { id: 'billing', label: 'Billing', icon: <CreditCardIcon className="w-5 h-5" /> },
        { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon className="w-5 h-5" /> },
        { id: 'reports', label: 'Reports', icon: <DocumentTextIcon className="w-5 h-5" /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'overview': return <SystemOverview stats={adminStats} />;
            case 'users': return <UserManagement users={users} />;
            case 'schools': return <SchoolManagement />;
            case 'content': return <ContentManagement />;
            case 'billing': return <BillingSubscriptions />;
            case 'analytics': return <AdvancedAnalytics />;
            case 'reports': return <ReportsCompliance />;
            case 'settings': return <SystemSettings />;
            default: return <SystemOverview stats={adminStats} />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <aside className="w-full lg:w-20 xl:w-64 bg-bg-primary border-r border-border-light p-4 flex-shrink-0">
                 <nav className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto">
                    {navItems.map(item => (
                        <NavButton
                            key={item.id}
                            label={item.label}
                            icon={item.icon}
                            isActive={activeView === item.id}
                            onClick={() => setActiveView(item.id as AdminView)}
                        />
                    ))}
                </nav>
            </aside>
             <main className="flex-grow p-6 overflow-y-auto">
                <div className="animate-fade-in">
                  {renderContent()}
                </div>
            </main>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
