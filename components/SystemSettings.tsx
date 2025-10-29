import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { SettingsIcon } from './Icons.tsx';

const SystemSettings: React.FC = () => {
    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md space-y-6">
            <h3 className="text-xl font-bold font-heading flex items-center"><SettingsIcon className="w-6 h-6 mr-2" />System Settings</h3>

            <div className="p-6 text-center bg-bg-secondary rounded-xl border-2 border-dashed border-border-medium">
                <SettingsIcon className="w-12 h-12 mx-auto text-text-tertiary animate-spin" style={{ animationDuration: '5s' }} />
                <h4 className="text-lg font-bold mt-4">Platform Configuration</h4>
                <p className="text-text-secondary">This is a placeholder for global system settings, such as feature flags, API integrations, and maintenance mode.</p>
            </div>

            <div>
                <h4 className="font-bold mb-2">Configuration Areas</h4>
                 <div className="flex flex-col space-y-3">
                    <div className="p-4 rounded-lg bg-bg-secondary border border-border-light">
                        <p className="font-semibold">General Settings</p>
                        <p className="text-sm text-text-secondary">Application name, logo, and contact information.</p>
                    </div>
                     <div className="p-4 rounded-lg bg-bg-secondary border border-border-light">
                        <p className="font-semibold">Security</p>
                        <p className="text-sm text-text-secondary">Manage authentication methods, password policies, and API keys.</p>
                    </div>
                     <div className="p-4 rounded-lg bg-bg-secondary border border-border-light">
                        <p className="font-semibold">Integrations</p>
                        <p className="text-sm text-text-secondary">Connect with third-party services like payment gateways or LMS.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
