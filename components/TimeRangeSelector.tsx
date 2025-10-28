import React from 'react';

interface TimeRangeSelectorProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange, options }) => {
    return (
        <div className="flex space-x-1 bg-bg-secondary p-1 rounded-lg">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors
                        ${value === option.value
                            ? 'bg-bg-primary shadow-sm text-primary-600'
                            : 'text-text-secondary hover:bg-bg-tertiary'
                        }`
                    }
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default TimeRangeSelector;