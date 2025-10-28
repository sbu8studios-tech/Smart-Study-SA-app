import React, { useState, useRef, useEffect } from 'react';
import { FilterListIcon, ChevronDownIcon } from './Icons.tsx';

interface FilterDropdownProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || 'Select Filter';

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-bg-primary border border-border-medium font-semibold px-4 py-2 rounded-lg hover:bg-bg-tertiary transition-colors"
            >
                <FilterListIcon className="w-5 h-5 text-text-secondary" />
                <span>{selectedLabel}</span>
                <ChevronDownIcon className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-bg-primary rounded-lg shadow-lg border border-border-light z-dropdown origin-top-right animate-fade-in-down p-1">
                    {options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-md ${value === option.value ? 'bg-primary-100 dark:bg-primary-500/10 text-primary-600' : 'text-text-primary hover:bg-bg-tertiary'}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
