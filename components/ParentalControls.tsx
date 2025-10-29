import React, { useState } from 'react';
import { StudentProfile } from '../types.ts';
import { ShieldIcon, SaveIcon } from './Icons.tsx';

interface ParentalControlsProps {
    child: StudentProfile;
    onUpdate: () => void;
}

const ControlSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
        <h3 className="text-lg font-bold mb-4 font-heading">{title}</h3>
        {children}
    </div>
);

const Toggle: React.FC<{ label: string; isEnabled: boolean; onToggle: (enabled: boolean) => void; }> = ({ label, isEnabled, onToggle }) => (
    <div className="flex justify-between items-center">
        <span className="font-semibold">{label}</span>
        <button
            onClick={() => onToggle(!isEnabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isEnabled ? 'bg-primary-600' : 'bg-border-medium'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const Slider: React.FC<{ label: string; value: number; onChange: (value: number) => void; max: number; unit: string; }> = ({ label, value, onChange, max, unit }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <label className="font-semibold">{label}</label>
            <span className="font-bold text-primary-600">{value} {unit}</span>
        </div>
        <input
            type="range"
            min="0"
            max={max}
            step="15"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer"
        />
    </div>
);


const ParentalControls: React.FC<ParentalControlsProps> = ({ child, onUpdate }) => {
    const [settings, setSettings] = useState(child.parentalControls);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        console.log("Saving settings:", settings);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            onUpdate();
            // Could show a success toast here
        }, 1000);
    };
    
    if (!settings) return <p>No settings available for this child.</p>

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-heading flex items-center">
                <ShieldIcon className="w-7 h-7 mr-2 text-primary-500" />
                Parental Controls for {child.name}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ControlSection title="Study Time Limits">
                    <div className="space-y-4">
                        <Slider 
                            label="Weekdays Daily Limit"
                            value={settings.studyTime.weekdays}
                            onChange={(val) => setSettings(s => ({...s!, studyTime: {...s!.studyTime, weekdays: val}}))}
                            max={240}
                            unit="minutes"
                        />
                         <Slider 
                            label="Weekends Daily Limit"
                            value={settings.studyTime.weekends}
                            onChange={(val) => setSettings(s => ({...s!, studyTime: {...s!.studyTime, weekends: val}}))}
                            max={300}
                            unit="minutes"
                        />
                    </div>
                </ControlSection>

                <ControlSection title="Notifications">
                    <div className="space-y-4">
                        <Toggle 
                            label="New Grades Posted" 
                            isEnabled={settings.notifications.grades}
                            onToggle={(val) => setSettings(s => ({...s!, notifications: {...s!.notifications, grades: val}}))}
                        />
                         <Toggle 
                            label="Attendance Alerts" 
                            isEnabled={settings.notifications.attendance}
                            onToggle={(val) => setSettings(s => ({...s!, notifications: {...s!.notifications, attendance: val}}))}
                        />
                         <Toggle 
                            label="Assignments Due Soon" 
                            isEnabled={settings.notifications.assignments}
                            onToggle={(val) => setSettings(s => ({...s!, notifications: {...s!.notifications, assignments: val}}))}
                        />
                    </div>
                </ControlSection>
            </div>
            
             <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    <SaveIcon className="w-5 h-5" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default ParentalControls;
