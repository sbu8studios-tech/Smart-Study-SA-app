import React, { useState } from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { Assignment } from '../types';
import FilterDropdown from './FilterDropdown.tsx';
import CreateAssignmentModal from './CreateAssignmentModal.tsx';
import AssignmentCard from './AssignmentCard.tsx';
import AssignmentStats from './AssignmentStats.tsx';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { AddCircleIcon } from './Icons';

interface AssignmentCenterProps {
    assignments: Assignment[];
    onDataUpdate: () => void; // Mock function for now
}

const AssignmentCenter: React.FC<AssignmentCenterProps> = ({ assignments: initialAssignments, onDataUpdate }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In a real app, this would be an API call
  const handleCreateAssignment = (newAssignment: Omit<Assignment, 'id' | 'totalSubmissions' | 'gradedSubmissions'>) => {
    const createdAssignment: Assignment = {
      id: `assign-${Date.now()}`,
      totalSubmissions: 30, // Mock total students
      gradedSubmissions: 0,
      ...newAssignment
    };
    setAssignments(prev => [createdAssignment, ...prev]);
    onDataUpdate();
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return assignment.gradedSubmissions < assignment.totalSubmissions;
    if (filter === 'graded') return assignment.gradedSubmissions === assignment.totalSubmissions;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h3 className="text-xl font-bold font-heading">Assignment Management</h3>
        <div className="flex items-center gap-2">
          <FilterDropdown
            options={[
              { value: 'all', label: 'All Assignments' },
              { value: 'pending', label: 'Pending Grading' },
              { value: 'graded', label: 'Fully Graded' }
            ]}
            value={filter}
            onChange={setFilter}
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <AddCircleIcon className="w-5 h-5" />
            <span>Create</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
          />
        ))}
      </div>
        
      {filteredAssignments.length === 0 && (
          <div className="text-center py-12 bg-bg-secondary rounded-lg">
              <p className="font-semibold">No assignments match the current filter.</p>
              <p className="text-sm text-text-secondary">Try selecting a different filter or creating a new assignment.</p>
          </div>
      )}

      <AssignmentStats assignments={assignments} />

      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssignment}
      />
    </div>
  );
};

export default AssignmentCenter;