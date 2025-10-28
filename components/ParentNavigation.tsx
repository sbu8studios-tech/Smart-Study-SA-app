import React from 'react';
import { DashboardIcon, AcademicCapIcon, CalendarIcon, MessageIcon, CreditCardIcon, SettingsIcon } from './Icons.tsx';

type ParentView = 'overview' | 'academics' | 'attendance' | 'communications' | 'payments' | 'settings';

interface ParentNavigationProps {
    activeView: ParentView;
    onNavigate: (view: ParentView) => void;
}

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
        <span>{label}</span>
    </button>
);

const ParentNavigation: React.FC<ParentNavigationProps> = ({ activeView, onNavigate }) => {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: <DashboardIcon className="w-5 h-5" /> },
        { id: 'academics', label: 'Academics', icon: <AcademicCapIcon className="w-5 h-5" /> },
        { id: 'attendance', label: 'Attendance', icon: <CalendarIcon className="w-5 h-5" /> },
        { id: 'communications', label: 'Messages', icon: <MessageIcon className="w-5 h-5" /> },
        { id: 'payments', label: 'Payments', icon: <CreditCardIcon className="w-5 h-5" /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-full lg:w-64 bg-bg-primary border-r border-border-light p-4 flex-shrink-0">
            <nav className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto">
                {navItems.map(item => (
                    <NavButton
                        key={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={activeView === item.id}
                        onClick={() => onNavigate(item.id as ParentView)}
                    />
                ))}
            </nav>
        </aside>
    );
};

export default ParentNavigation;