import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './Icons.tsx';

interface BulkActionsDropdownProps {
    selectedUserIds: string[];
    onAction: (action: string) => void;
}

const BulkActionsDropdown: React.FC<BulkActionsDropdownProps> = ({ selectedUserIds, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hasSelection = selectedUserIds.length > 0;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleAction = (action: string) => {
        onAction(action);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={!hasSelection}
                className="flex items-center gap-2 bg-bg-primary border border-border-medium font-semibold px-4 py-2 rounded-lg hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Bulk Actions</span>
                <ChevronDownIcon className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && hasSelection && (
                <div className="absolute right-0 mt-2 w-56 bg-bg-primary rounded-lg shadow-lg border border-border-light z-dropdown origin-top-right animate-fade-in-down p-1">
                    <button onClick={() => handleAction('deactivate')} className="w-full text-left px-3 py-2 text-sm rounded-md text-error-500 hover:bg-error-500/10">
                        Deactivate Selected ({selectedUserIds.length})
                    </button>
                    <button onClick={() => handleAction('export')} className="w-full text-left px-3 py-2 text-sm rounded-md text-text-primary hover:bg-bg-tertiary">
                        Export Selected ({selectedUserIds.length})
                    </button>
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-5px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fade-in-down 0.15s ease-out; }
            `}</style>
        </div>
    );
};

export default BulkActionsDropdown;
