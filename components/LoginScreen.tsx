import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext.tsx';
import { DEFAULT_LOGO_URL } from '../constants.ts';
// FIX: Corrected import path for types.ts to be a relative path.
import { User, UserRole } from '../types.ts';
import EmailLoginForm from './EmailLoginForm.tsx';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { GoogleIcon, AppleIcon, FacebookIcon, MicrosoftIcon, ShieldIcon, GuestIcon, EmailIcon, PhoneIcon, SocialTabIcon, EmailTabIcon, PhoneTabIcon } from './Icons.tsx';

// --- Sub-components for the new Login Screen ---

const EnhancedSocialLogin: React.FC<{ onLogin: (provider: string) => void; setActiveTab: (tab: 'email' | 'phone') => void; }> = ({ onLogin, setActiveTab }) => {
  const [clickedProvider, setClickedProvider] = useState<string | null>(null);

  const handleSocialLogin = async (provider: string) => {
    setClickedProvider(provider);
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
    onLogin(provider);
    setClickedProvider(null);
  };
  
  const handleGuestAccess = () => {
      handleSocialLogin('guest');
  };

  const socialProviders = [
    { 
      provider: 'google', 
      label: 'Google', 
      icon: <GoogleIcon />,
      bgColor: '#ffffff',
      textColor: '#3c4043',
      borderColor: '#dadce0'
    },
    { 
      provider: 'apple', 
      label: 'Apple', 
      icon: <AppleIcon />,
      bgColor: '#000000',
      textColor: '#ffffff',
      borderColor: '#000000'
    },
    { 
      provider: 'facebook', 
      label: 'Facebook', 
      icon: <FacebookIcon />,
      bgColor: '#1877F2',
      textColor: '#ffffff',
      borderColor: '#1877F2'
    },
    { 
      provider: 'microsoft', 
      label: 'Microsoft', 
      icon: <MicrosoftIcon />,
      bgColor: '#ffffff',
      textColor: '#5d5d5d',
      borderColor: '#5d5d5d'
    }
  ];

  return (
    <div className="enhanced-social-login">
      <div className="social-grid-premium">
        {socialProviders.map(({ provider, label, icon, bgColor, textColor, borderColor }) => (
          <button
            key={provider}
            className={`social-btn-premium`}
            onClick={() => handleSocialLogin(provider)}
            disabled={!!clickedProvider}
            style={{
              '--bg-color': bgColor,
              '--text-color': textColor,
              '--border-color': borderColor
            } as React.CSSProperties}
          >
            <div className="social-btn-inner">
              <div className="social-icon-container">
                {icon}
              </div>
              <span className="social-btn-label">{label}</span>
            </div>
            {clickedProvider === provider && (
              <div className="social-btn-loading">
                <div className="loading-spinner"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="enhanced-divider">
        <span className="divider-line"></span>
        <span className="divider-text">or</span>
        <span className="divider-line"></span>
      </div>
      
      <div className="quick-access-options">
        <button className="quick-option-btn email-option" onClick={() => setActiveTab('email')}>
          <div className="option-icon-container"><EmailIcon /></div>
          <span>Continue with Email</span>
        </button>
        <button className="quick-option-btn phone-option" onClick={() => setActiveTab('phone')}>
          <div className="option-icon-container"><PhoneIcon /></div>
          <span>Continue with Phone</span>
        </button>
        <button className="quick-option-btn guest-option" onClick={handleGuestAccess}>
          <div className="option-icon-container"><GuestIcon /></div>
          <span>Continue as Guest</span>
        </button>
      </div>
    </div>
  );
};


const RoleSelector: React.FC<{selectedRole: UserRole; onSelectRole: (role: UserRole) => void}> = ({ selectedRole, onSelectRole }) => {
    const roles = Object.values(UserRole);
    return (
        <div className="w-full p-1 bg-bg-secondary dark:bg-bg-primary rounded-lg flex space-x-1 mb-8 shadow-inner">
            {roles.map(role => (
                <button
                    key={role}
                    onClick={() => onSelectRole(role)}
                    className={`w-full h-9 rounded-md text-sm font-bold capitalize transition-all duration-300 transform
                        ${selectedRole === role 
                            ? 'bg-bg-primary dark:bg-bg-secondary text-primary-600 dark:text-primary-500 shadow-md scale-105' 
                            : 'text-text-secondary hover:bg-bg-primary/50 dark:hover:bg-bg-tertiary'
                        }`}
                >
                    {role}
                </button>
            ))}
        </div>
    );
}

const PhoneLoginTab: React.FC = () => (
    <div className="space-y-4">
         <p className="text-center text-sm text-text-secondary mb-4">Enter your phone number to receive a one-time password (OTP).</p>
        <input 
            type="tel"
            placeholder="e.g., 082 123 4567"
            disabled
            className="w-full h-12 px-4 bg-bg-tertiary border border-border-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors opacity-50 cursor-not-allowed"
        />
        <button 
            disabled 
            className="w-full h-12 font-bold rounded-lg bg-primary-600 text-text-inverse opacity-50 cursor-not-allowed"
        >
            Send OTP
        </button>
        <p className="text-xs text-center text-text-tertiary">Phone login is not yet available.</p>
    </div>
);

// --- MAIN COMPONENT ---

const LoginScreen: React.FC = () => {
    const { login } = useUser();
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
    const [activeTab, setActiveTab] = useState<'social' | 'email' | 'phone'>('social');

    const handleSocialLogin = (provider: string) => {
        if (provider === 'guest') {
            console.log('Logging in as Guest');
            // FIX: Added missing 'id' property to guest user object.
            const guestUser: User = {
                id: 'guest-user-1',
                name: 'Guest User',
                email: 'guest@smartstudy.co.za',
                role: UserRole.STUDENT, // Guests are treated as students with limited access
            };
            login(guestUser);
            return;
        }

        console.log(`Logging in with ${provider} for role ${selectedRole}`);
        // FIX: Added missing 'id' property to all user objects in the map.
        const userMap: Record<UserRole, User> = {
            [UserRole.STUDENT]: { id: 'user-1', name: 'Alex Smith', email: 'alex.smith@example.com', role: UserRole.STUDENT },
            [UserRole.PARENT]: { id: 'user-2', name: 'Brenda Smith', email: 'brenda.smith@example.com', role: UserRole.PARENT },
            [UserRole.TEACHER]: { id: 'user-3', name: 'Charles Davis', email: 'c.davis@school.com', role: UserRole.TEACHER },
            [UserRole.ADMIN]: { id: 'user-4', name: 'Diana Prince', email: 'd.prince@schooldistrict.com', role: UserRole.ADMIN },
        };
        login(userMap[selectedRole]);
    };
    
    const TABS = [
        { id: 'social', label: 'Social', icon: <SocialTabIcon /> },
        { id: 'email', label: 'Email', icon: <EmailTabIcon /> },
        { id: 'phone', label: 'Phone', icon: <PhoneTabIcon /> },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'social':
                return <EnhancedSocialLogin onLogin={handleSocialLogin} setActiveTab={setActiveTab} />;
            case 'email':
                return <EmailLoginForm />;
            case 'phone':
                return <PhoneLoginTab />;
            default:
                return null;
        }
    };

    return (
        <div className="premium-login-container">
            <div className="login-background">
                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
            </div>
            
            <main className="login-content">
                 <div className="login-header">
                    <div className="logo-container">
                        <img src={DEFAULT_LOGO_URL} alt="SmartStudy SA Logo" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
                    </div>
                    <h1 className="login-title">Welcome to SmartStudy</h1>
                    <p className="login-subtitle">Your AI-powered learning journey begins here</p>
                </div>
                
                <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

                <div className="enhanced-tab-system">
                    <div className="tab-indicators-container">
                        {TABS.map(tab => (
                             <button
                                key={tab.id}
                                className={`tab-indicator ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id as any)}
                              >
                                <div className="tab-icon-wrapper">{tab.icon}</div>
                                <span className="tab-label">
                                  {tab.label}
                                </span>
                                <div className="tab-underline"></div>
                            </button>
                        ))}
                    </div>
                    <div className="tab-content-wrapper">
                       <div className="tab-content" key={activeTab}>
                         {renderTabContent()}
                       </div>
                    </div>
                </div>

                <div className="login-footer-enhanced">
                    <div className="security-badge">
                        <ShieldIcon className="badge-icon" />
                        <span>Secure & Encrypted</span>
                    </div>
                    <p className="terms-text">
                        By continuing, you agree to our{' '}
                        <a href="#" className="link-primary">Terms</a> and{' '}
                        <a href="#" className="link-primary">Privacy Policy</a>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginScreen;
