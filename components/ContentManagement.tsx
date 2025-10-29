import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { LibraryIcon, BookOpenIcon } from './Icons.tsx';

const ContentManagement: React.FC = () => {
  return (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md space-y-6">
      <h3 className="text-xl font-bold font-heading flex items-center"><LibraryIcon className="w-6 h-6 mr-2" />Content Management</h3>

       <div className="p-6 text-center bg-bg-secondary rounded-xl border-2 border-dashed border-border-medium">
          <BookOpenIcon className="w-12 h-12 mx-auto text-text-tertiary" />
          <h4 className="text-lg font-bold mt-4">Curriculum Control Center</h4>
          <p className="text-text-secondary">This module will provide tools to manage the CAPS curriculum data, subjects per grade, and global educational resources.</p>
      </div>

       <div>
            <h4 className="font-bold mb-2">Curriculum Sections</h4>
            <div className="flex flex-col space-y-3">
                <button className="w-full text-left p-4 font-semibold rounded-lg bg-bg-secondary border border-border-light hover:bg-bg-tertiary transition-colors">Manage Grades & Subjects</button>
                <button className="w-full text-left p-4 font-semibold rounded-lg bg-bg-secondary border border-border-light hover:bg-bg-tertiary transition-colors">Manage Learning Resources</button>
                <button className="w-full text-left p-4 font-semibold rounded-lg bg-bg-secondary border border-border-light hover:bg-bg-tertiary transition-colors">Update AI Tutor Prompts</button>
            </div>
        </div>
    </div>
  );
};

export default ContentManagement;
