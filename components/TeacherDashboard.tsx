import React, { useState } from 'react';
// FIX: Corrected import path for mockData.ts to be a relative path.
import { MOCK_CLASSROOMS, MOCK_ASSIGNMENTS, MOCK_ACTIVITIES } from '../mockData.ts';
// FIX: Corrected import path for types.ts to be a relative path.
import { Classroom, Assignment, Activity } from '../types.ts';
import { 
    DashboardIcon, UsersIcon, ClipboardListIcon, AnalyticsIcon, LibraryIcon, MessageIcon, 
    TrendingUpIcon, AddCircleIcon, CampaignIcon, CheckBadgeIcon, CalendarIcon, GradingIcon, AssessmentIcon 
// FIX: Corrected import path for Icons.tsx to be a relative path.
} from './Icons.tsx';
import AnalyticsDashboard from './AnalyticsDashboard.tsx';
import ResourceLibrary from './ResourceLibrary.tsx';
import CommunicationCenter from './CommunicationCenter.tsx';
import AssignmentCenter from './AssignmentCenter.tsx';

// --- SUB-COMPONENTS for the Teacher Dashboard ---

const IconMapper: React.FC<{ icon: string; className?: string }> = ({ icon, className = "w-8 h-8" }) => {
    switch (icon) {
        case 'groups': return <UsersIcon className={className} />;
        case 'grading': return <GradingIcon className={className} />;
        case 'trending_up': return <TrendingUpIcon className={className} />;
        case 'event_available': return <CalendarIcon className={className} />;
        case 'add_circle': return <AddCircleIcon className={className} />;
        case 'campaign': return <CampaignIcon className={className} />;
        case 'assessment': return <AssessmentIcon className={className} />;
        default: return null;
    }
};

const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: string;
    trend: { value: string; isPositive: boolean };
    color: 'primary' | 'warning' | 'success' | 'info';
}> = ({ title, value, icon, trend, color }) => {
    const colorClasses = {
        primary: 'from-blue-500 to-blue-600',
        warning: 'from-yellow-500 to-yellow-600',
        success: 'from-green-500 to-green-600',
        info: 'from-sky-500 to-sky-600',
    };
    const trendColor = trend.isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
                <p className="font-bold text-text-primary">{title}</p>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white shadow-sm`}>
                    <IconMapper icon={icon} className="w-6 h-6" />
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold font-heading mt-2">{value}</p>
                <p className={`text-sm font-semibold ${trendColor}`}>{trend.value} this week</p>
            </div>
        </div>
    );
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
    <li className="py-3 flex items-start space-x-3">
        <div className="bg-bg-tertiary p-2 rounded-full mt-1">
            {activity.type === 'grade' && <CheckBadgeIcon className="w-5 h-5 text-success-500" />}
            {activity.type === 'assignment' && <ClipboardListIcon className="w-5 h-5 text-primary-500" />}
            {activity.type === 'login' && <AnalyticsIcon className="w-5 h-5 text-warning-500" />}
        </div>
        <div>
            <p className="text-sm font-medium">{activity.description}</p>
            <p className="text-xs text-text-secondary">{activity.timestamp}</p>
        </div>
    </li>
);

const ActivityFeed: React.FC<{ activities: Activity[] }> = ({ activities }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
        <ul className="divide-y divide-border-light max-h-80 overflow-y-auto">
            {activities.length > 0 ? (
                activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)
            ) : (
                <p className="text-sm text-text-secondary text-center py-4">No recent activity.</p>
            )}
        </ul>
    </div>
);

const QuickAction: React.FC<{
    title: string;
    icon: string;
    onClick: () => void;
    color: 'primary' | 'warning' | 'success' | 'info';
}> = ({ title, icon, onClick, color }) => {
    const colorClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700',
        warning: 'bg-warning-500 hover:bg-orange-600',
        success: 'bg-success-500 hover:bg-green-600',
        info: 'bg-sky-500 hover:bg-sky-600',
    };
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-4 rounded-xl text-white font-semibold shadow-md transition-transform hover:-translate-y-1 ${colorClasses[color]}`}
        >
            <IconMapper icon={icon} className="w-8 h-8 mb-2" />
            <span>{title}</span>
        </button>
    );
};


const DashboardTabs: React.FC<{ 
    tabs: { id: string; label: string; icon: React.ReactNode }[];
    activeTab: string;
    onTabChange: (id: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => (
    <div className="mb-6 border-b border-border-light">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-semibold text-sm flex items-center space-x-2 transition-colors
                        ${activeTab === tab.id
                            ? 'border-primary-500 text-primary-500'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-medium'
                        }`}
                >
                    {tab.icon}
                    <span>{tab.label}</span>
                </button>
            ))}
        </nav>
    </div>
);

// --- TAB CONTENT COMPONENTS ---

const TeacherOverview: React.FC<{
    classes: Classroom[];
    assignments: Assignment[];
    analytics: { classAverage: number; attendanceRate: number; recentActivities: Activity[] };
}> = ({ classes, assignments, analytics }) => {
  return (
    <div className="space-y-6">
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Classes"
          value={classes?.length || 0}
          icon="groups"
          trend={{ value: '+2', isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Pending Grading"
          value={assignments?.reduce((acc, a) => acc + (a.totalSubmissions - a.gradedSubmissions), 0) || 0}
          icon="grading"
          trend={{ value: '+5', isPositive: false }}
          color="warning"
        />
        <StatCard
          title="Student Average"
          value={`${analytics?.classAverage || 0}%`}
          icon="trending_up"
          trend={{ value: '+3%', isPositive: true }}
          color="success"
        />
        <StatCard
          title="Attendance Rate"
          value={`${analytics?.attendanceRate || 0}%`}
          icon="event_available"
          trend={{ value: '+2%', isPositive: true }}
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="recent-activity-section lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 font-heading">Recent Activity</h3>
            <ActivityFeed activities={analytics?.recentActivities || []} />
          </div>

          <div className="quick-actions-section lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 font-heading">Quick Actions</h3>
            <div className="quick-actions-grid grid grid-cols-2 gap-4">
              <QuickAction
                title="Create Assignment"
                icon="add_circle"
                onClick={() => {/* Open assignment creator */}}
                color="primary"
              />
              <QuickAction
                title="Take Attendance"
                icon="event_available"
                onClick={() => {/* Open attendance modal */}}
                color="success"
              />
              <QuickAction
                title="Send Announcement"
                icon="campaign"
                onClick={() => {/* Open announcement composer */}}
                color="info"
              />
              <QuickAction
                title="View Reports"
                icon="assessment"
                onClick={() => {/* Open reports */}}
                color="warning"
              />
            </div>
          </div>
      </div>
    </div>
  );
};


// --- MAIN TEACHER DASHBOARD COMPONENT ---

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const overviewData = {
    classes: MOCK_CLASSROOMS,
    assignments: MOCK_ASSIGNMENTS,
    analytics: {
        classAverage: 72,
        attendanceRate: 94,
        recentActivities: MOCK_ACTIVITIES
    }
  };

  const tabs = [
      { id: 'overview', label: 'Overview', icon: <DashboardIcon className="w-5 h-5" /> },
      { id: 'assignments', label: 'Assignments', icon: <ClipboardListIcon className="w-5 h-5" /> },
      { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon className="w-5 h-5" /> },
      { id: 'resources', label: 'Resources', icon: <LibraryIcon className="w-5 h-5" /> },
      { id: 'communications', label: 'Messages', icon: <MessageIcon className="w-5 h-5" /> }
  ];

  const renderContent = () => {
      switch (activeTab) {
          case 'overview': return <TeacherOverview {...overviewData} />;
          case 'assignments': return <AssignmentCenter assignments={MOCK_ASSIGNMENTS} onDataUpdate={() => console.log("Data refresh triggered")} />;
          case 'analytics': return <AnalyticsDashboard />;
          case 'resources': return <ResourceLibrary />;
          case 'communications': return <CommunicationCenter />;
          default: return null;
      }
  };
  
  return (
    <div className="p-6">
      <DashboardTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="tab-content mt-6 animate-fade-in">
        {renderContent()}
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;
