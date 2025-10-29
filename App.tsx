import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './contexts/UserContext.tsx';
// FIX: Corrected import path for types.ts to be a relative path.
import { Subject, User, UserRole } from './types.ts';
import useChat from './hooks/useChat.ts';

import LoginScreen from './components/LoginScreen.tsx';
import Dashboard from './components/Dashboard.tsx';
// FIX: Corrected import path for ParentDashboard to be a relative path.
import ParentDashboard from './components/ParentDashboard.tsx';
// FIX: Corrected import path for TeacherDashboard to be a relative path.
import TeacherDashboard from './components/TeacherDashboard.tsx';
// FIX: Corrected import path for AdminDashboard to be a relative path.
import AdminDashboard from './components/AdminDashboard.tsx';
import Header from './components/Header.tsx';
import ChatWindow from './components/ChatWindow.tsx';
import EnhancedChatInput from './components/EnhancedChatInput.tsx';
import { DEFAULT_LOGO_URL } from './constants.ts';

const ChatView: React.FC<{
    subject: Subject;
    onBack: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    user: User;
    onLogout: () => void;
}> = ({ subject, onBack, isDarkMode, toggleDarkMode, user, onLogout }) => {
    const { messages, isLoading, sendMessage, translateMessage, revertToOriginal } = useChat(subject);

    const handleSend = (message: string, files?: File[]) => {
      sendMessage(message, files);
    };

    return (
        <div className="flex flex-col h-full bg-bg-secondary">
            <Header
                title={subject.name}
                subtitle={subject.grade}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                showBackButton={true}
                onBack={onBack}
                logoUrl={DEFAULT_LOGO_URL}
                onLogoClick={() => {}}
                isLogoClickable={false}
                user={user}
                onLogout={onLogout}
            />
            <ChatWindow 
                messages={messages} 
                isLoading={isLoading} 
                onSuggestedQuestion={(q) => handleSend(q)}
                onTranslateMessage={translateMessage}
                onRevertTranslation={revertToOriginal}
            />
            <EnhancedChatInput
                onSendMessage={handleSend}
                isLoading={isLoading}
            />
        </div>
    );
};


const AppContent: React.FC = () => {
    const { user, logout, currentSubject, setCurrentSubject } = useUser();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    if (!user) {
        return <LoginScreen />;
    }

    const renderDashboard = () => {
        switch (user.role) {
            case UserRole.STUDENT:
                return <Dashboard onSelectSubject={setCurrentSubject} />;
            case UserRole.PARENT:
                return <ParentDashboard />;
            case UserRole.TEACHER:
                return <TeacherDashboard />;
            case UserRole.ADMIN:
                return <AdminDashboard />;
            default:
                return <div>Unsupported role</div>;
        }
    };
    
    const getDashboardTitle = () => {
        switch (user.role) {
            case UserRole.STUDENT: return "Dashboard";
            case UserRole.PARENT: return "Parent Portal";
            case UserRole.TEACHER: return "Teacher Portal";
            case UserRole.ADMIN: return "Admin Portal";
            default: return "Dashboard";
        }
    };
    
     const getDashboardSubtitle = () => {
        switch (user.role) {
            case UserRole.STUDENT: return "Choose a subject to get started";
            default: return "Manage your activities";
        }
    };

    return (
        <div className="h-screen w-screen bg-bg-secondary text-text-primary font-sans flex flex-col">
            {currentSubject && user.role === UserRole.STUDENT ? (
                <ChatView
                    subject={currentSubject}
                    onBack={() => setCurrentSubject(null)}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    user={user}
                    onLogout={logout}
                />
            ) : (
                 <div className="flex flex-col h-full">
                    <Header
                        title={getDashboardTitle()}
                        subtitle={getDashboardSubtitle()}
                        isDarkMode={isDarkMode}
                        toggleDarkMode={toggleDarkMode}
                        showBackButton={false}
                        onBack={() => {}}
                        logoUrl={DEFAULT_LOGO_URL}
                        onLogoClick={() => {}}
                        isLogoClickable={false}
                        user={user}
                        onLogout={logout}
                    />
                    <div className="flex-grow overflow-y-auto">
                        {renderDashboard()}
                    </div>
                 </div>
            )}
        </div>
    );
};

const App: React.FC = () => (
    <UserProvider>
        <AppContent />
    </UserProvider>
);

export default App;
