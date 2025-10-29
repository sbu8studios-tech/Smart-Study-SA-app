import React, { useState, useRef, useEffect } from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { User } from '../types.ts';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { SunIcon, MoonIcon, BackIcon, UploadIcon, LogoutIcon } from './Icons.tsx';

interface HeaderProps {
  title: string;
  subtitle: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showBackButton: boolean;
  onBack: () => void;
  logoUrl: string;
  onLogoClick: () => void;
  isLogoClickable: boolean;
  user: User | null;
  onLogout: () => void;
}

const ProfileMenu: React.FC<{user: User; isDarkMode: boolean; toggleDarkMode: () => void; onLogout: () => void;}> = ({ user, isDarkMode, toggleDarkMode, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full bg-primary-600 text-text-inverse flex items-center justify-center font-bold text-lg hover:ring-2 hover:ring-primary-500 ring-offset-2 ring-offset-bg-primary transition-all" aria-haspopup="true" aria-expanded={isOpen}>
                {user.avatarUrl ? <img src={user.avatarUrl} alt="User avatar" className="w-full h-full rounded-full object-cover" /> : <span>{getInitials(user.name)}</span>}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-bg-primary rounded-xl shadow-lg border border-border-light z-dropdown origin-top-right animate-fade-in-down">
                    <div className="p-4 border-b border-border-light">
                        <p className="font-bold text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                        <button onClick={toggleDarkMode} className="w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg text-text-primary hover:bg-bg-tertiary transition-colors">
                            <span>Theme</span>
                            {isDarkMode ? <SunIcon className="w-6 h-6 text-warning-500" /> : <MoonIcon className="w-6 h-6 text-primary-500" />}
                        </button>
                        <button onClick={onLogout} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error-500 rounded-lg hover:bg-error-500/10 transition-colors">
                            <LogoutIcon className="w-6 h-6" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px) scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, isDarkMode, toggleDarkMode, showBackButton, onBack, logoUrl, onLogoClick, isLogoClickable, user, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border-light flex-shrink-0 bg-bg-primary shadow-sm">
      <div className="flex items-center space-x-2">
        {showBackButton ? (
          <button onClick={onBack} className="p-2 rounded-full hover:bg-bg-tertiary transition-colors" aria-label="Back to dashboard">
            <BackIcon className="w-6 h-6" />
          </button>
        ) : (
           <button onClick={onLogoClick} disabled={!isLogoClickable} className={`group relative rounded-full ${isLogoClickable ? 'cursor-pointer' : 'cursor-default'}`} aria-label="Upload custom logo">
            <img src={logoUrl} alt="SmartStudy SA Logo" className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ${isLogoClickable ? 'group-hover:opacity-60 group-hover:scale-110' : ''}`} />
            {isLogoClickable && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UploadIcon className="w-5 h-5 text-white" />
            </div>}
           </button>
        )}
        <div>
          <h1 className="text-lg font-bold text-text-primary font-heading">
            {title}
          </h1>
           <p className="text-sm text-text-secondary -mt-1">
            {subtitle}
           </p>
        </div>
      </div>
      {user && (
         <ProfileMenu user={user} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onLogout={onLogout} />
      )}
    </header>
  );
};

export default Header;
