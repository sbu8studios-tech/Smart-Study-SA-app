import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { LibraryIcon, BookOpenIcon } from './Icons.tsx';

const ResourceItem: React.FC<{ title: string; type: 'folder' | 'pdf' | 'video' }> = ({ title, type }) => {
    const icons = {
        folder: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
        pdf: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        video: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    };
    return (
        <button className="flex flex-col items-center justify-center p-4 bg-bg-primary rounded-xl border border-border-light shadow-md hover:shadow-lg hover:-translate-y-1 transition-all space-y-2 text-center">
            {icons[type]}
            <p className="text-sm font-semibold text-text-primary">{title}</p>
        </button>
    );
};

const ResourceLibrary: React.FC = () => {
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold font-heading flex items-center"><LibraryIcon className="w-6 h-6 mr-2" />Resource Library</h3>
                <button className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Upload Resource</button>
            </div>
            
            <div className="p-6 text-center bg-bg-primary rounded-xl border-2 border-dashed border-border-medium">
                <BookOpenIcon className="w-12 h-12 mx-auto text-text-tertiary" />
                <h4 className="text-lg font-bold mt-4">Feature Under Development</h4>
                <p className="text-text-secondary">Soon you'll be able to upload, organize, and share your teaching materials right here.</p>
            </div>

            <div>
                <h4 className="font-bold mb-2">My Resources (Sample)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <ResourceItem title="Grade 10 Notes" type="folder" />
                    <ResourceItem title="Past Papers" type="folder" />
                    <ResourceItem title="Trig_Worksheet.pdf" type="pdf" />
                    <ResourceItem title="Newton's Laws.mp4" type="video" />
                </div>
            </div>
        </div>
    );
};

export default ResourceLibrary;
