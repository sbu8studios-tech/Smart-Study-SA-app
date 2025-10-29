import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { SchoolIcon } from './Icons.tsx';

const SchoolManagement: React.FC = () => {
  return (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold font-heading flex items-center"><SchoolIcon className="w-6 h-6 mr-2" />School Management</h3>
        <button className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Add New School</button>
      </div>

      <div className="p-6 text-center bg-bg-secondary rounded-xl border-2 border-dashed border-border-medium">
        <SchoolIcon className="w-12 h-12 mx-auto text-text-tertiary" />
        <h4 className="text-lg font-bold mt-4">Centralized School Administration</h4>
        <p className="text-text-secondary">This module is under development. It will allow administrators to manage school profiles, academic years, and district information.</p>
      </div>

       <div>
            <h4 className="font-bold mb-2">Registered Schools (Sample)</h4>
            <ul className="divide-y divide-border-light">
                <li className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Pretoria High School</p>
                        <p className="text-sm text-text-secondary">Gauteng District</p>
                    </div>
                    <button className="font-semibold text-sm text-primary-600 hover:underline">Manage</button>
                </li>
                 <li className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">Cape Town Secondary</p>
                        <p className="text-sm text-text-secondary">Western Cape District</p>
                    </div>
                    <button className="font-semibold text-sm text-primary-600 hover:underline">Manage</button>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default SchoolManagement;
