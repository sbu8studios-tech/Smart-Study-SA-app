import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { DocumentTextIcon, ShieldIcon } from './Icons';

const ReportsCompliance: React.FC = () => {
    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md space-y-6">
             <h3 className="text-xl font-bold font-heading flex items-center"><DocumentTextIcon className="w-6 h-6 mr-2" />Reports & Compliance</h3>

            <div className="p-6 text-center bg-bg-secondary rounded-xl border-2 border-dashed border-border-medium">
                <ShieldIcon className="w-12 h-12 mx-auto text-text-tertiary" />
                <h4 className="text-lg font-bold mt-4">Data & Reporting Hub</h4>
                <p className="text-text-secondary">This module will enable the generation of custom reports for educational and auditing purposes, and manage data privacy compliance (e.g., POPIA).</p>
            </div>
            
            <div>
                <h4 className="font-bold mb-2">Available Reports (Sample)</h4>
                <div className="flex flex-col space-y-3">
                    <div className="p-4 rounded-lg bg-bg-secondary border border-border-light">
                        <p className="font-semibold">User Activity Report</p>
                        <p className="text-sm text-text-secondary">Generate a report of user logins and session durations.</p>
                    </div>
                     <div className="p-4 rounded-lg bg-bg-secondary border border-border-light">
                        <p className="font-semibold">Academic Performance Report</p>
                        <p className="text-sm text-text-secondary">Aggregated performance data across schools or districts.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsCompliance;