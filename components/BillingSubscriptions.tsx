import React from 'react';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { CreditCardIcon } from './Icons';

const BillingSubscriptions: React.FC = () => {
    const plans = [
        { name: 'Student Plan', price: 'R 99/mo', features: ['AI Tutoring', 'Practice Problems'] },
        { name: 'Family Plan', price: 'R 249/mo', features: ['Up to 4 students', 'Parent Dashboard', 'AI Insights'] },
        { name: 'School Plan', price: 'Custom', features: ['Unlimited Students', 'Teacher & Admin Dashboards'] },
    ];

    return (
        <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md space-y-6">
            <h3 className="text-xl font-bold font-heading flex items-center"><CreditCardIcon className="w-6 h-6 mr-2" />Billing & Subscriptions</h3>

            <div className="p-6 text-center bg-bg-secondary rounded-xl border-2 border-dashed border-border-medium">
                <CreditCardIcon className="w-12 h-12 mx-auto text-text-tertiary" />
                <h4 className="text-lg font-bold mt-4">Full-Fledged Billing System</h4>
                <p className="text-text-secondary">This area will manage all aspects of subscriptions, invoicing, and payment processing. This is a placeholder for the UI.</p>
            </div>

            <div>
                <h4 className="font-bold mb-2">Subscription Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map(plan => (
                        <div key={plan.name} className="p-4 border border-border-light rounded-lg bg-bg-secondary">
                            <h5 className="font-bold text-lg text-primary-600">{plan.name}</h5>
                            <p className="font-semibold text-2xl">{plan.price}</p>
                            <ul className="text-sm list-disc list-inside mt-2 space-y-1">
                                {plan.features.map(f => <li key={f}>{f}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillingSubscriptions;