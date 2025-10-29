import React, { useState, useEffect } from 'react';
import { AdminAnalytics } from '../services/adminService.ts';
// FIX: Corrected import path for types.ts to be a relative path.
import { PlatformAnalytics } from '../types.ts';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { UsersIcon, MessageIcon, AnalyticsIcon, CreditCardIcon } from './Icons.tsx';

const AnalyticsCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
        <div className="flex items-center space-x-3 mb-2">
            <div className="bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 p-2 rounded-full">
                {icon}
            </div>
            <h4 className="font-bold text-text-primary">{title}</h4>
        </div>
        <p className="text-3xl font-bold font-heading">{value}</p>
    </div>
);

const AdvancedAnalytics: React.FC = () => {
    const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const data = await AdminAnalytics.getPlatformAnalytics();
            setAnalytics(data);
        };
        fetchAnalytics();
    }, []);

    if (!analytics) {
        return <p>Loading advanced analytics...</p>;
    }

    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md space-y-6">
             <h3 className="text-xl font-bold font-heading">Platform-Wide Analytics</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnalyticsCard title="Daily Active Users" value={analytics.userEngagement.dailyActiveUsers} icon={<UsersIcon className="w-5 h-5"/>} />
                <AnalyticsCard title="Avg. Session Duration" value={analytics.userEngagement.sessionDuration} icon={<UsersIcon className="w-5 h-5"/>} />
                <AnalyticsCard title="Avg. API Latency" value={analytics.performanceMetrics.avgApiLatency} icon={<AnalyticsIcon className="w-5 h-5"/>} />
                <AnalyticsCard title="Platform Uptime" value={analytics.performanceMetrics.uptime} icon={<AnalyticsIcon className="w-5 h-5"/>} />
                <AnalyticsCard title="Monthly Recurring Revenue" value={`R ${analytics.revenueAnalytics.mrr.toLocaleString()}`} icon={<CreditCardIcon className="w-5 h-5"/>} />
                <AnalyticsCard title="Customer Churn Rate" value={analytics.revenueAnalytics.churnRate} icon={<CreditCardIcon className="w-5 h-5"/>} />
            </div>

            <div>
                <h4 className="font-bold mb-2">Feature Usage</h4>
                <div className="space-y-2">
                    {Object.entries(analytics.featureUsage).map(([feature, usage]) => (
                        <div key={feature} className="bg-bg-secondary p-3 rounded-lg">
                            <div className="flex justify-between text-sm font-semibold mb-1">
                                <span>{feature}</span>
                                <span>{usage}</span>
                            </div>
                            <div className="w-full bg-bg-tertiary rounded-full h-2.5">
                                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: usage }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvancedAnalytics;
