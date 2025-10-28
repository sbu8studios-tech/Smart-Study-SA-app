import React from 'react';
import { StudentProfile } from '../types.ts';
import { CreditCardIcon } from './Icons.tsx';

interface PaymentsProps {
    student: StudentProfile;
}

const mockInvoices = [
    { id: 'inv-003', item: 'Term 3 Fees', amount: 'R 2,500.00', status: 'Paid', date: '2024-07-15' },
    { id: 'inv-002', item: 'Term 2 Fees', amount: 'R 2,500.00', status: 'Paid', date: '2024-04-15' },
    { id: 'inv-001', item: 'Term 1 Fees', amount: 'R 2,500.00', status: 'Paid', date: '2024-01-15' },
];

const Payments: React.FC<PaymentsProps> = ({ student }) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h3 className="text-xl font-bold font-heading flex items-center"><CreditCardIcon className="w-6 h-6 mr-2" />School Fee Payments</h3>
                <button className="mt-2 sm:mt-0 bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors opacity-50 cursor-not-allowed">
                    Make a Payment
                </button>
            </div>

            <div className="p-8 text-center bg-bg-secondary rounded-xl">
                <CreditCardIcon className="w-12 h-12 mx-auto text-text-tertiary" />
                <h4 className="text-lg font-bold mt-4">Secure Payment Portal (Under Development)</h4>
                <p className="text-text-secondary">This section will allow for easy management of school fees and other payments.</p>
            </div>

            <div className="bg-bg-primary p-4 rounded-xl border border-border-light shadow-md">
                <h4 className="font-bold mb-3">Payment History (Sample)</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-bg-tertiary">
                            <tr>
                                <th className="p-3 font-semibold text-left text-text-secondary">Date</th>
                                <th className="p-3 font-semibold text-left text-text-secondary">Description</th>
                                <th className="p-3 font-semibold text-left text-text-secondary">Amount</th>
                                <th className="p-3 font-semibold text-left text-text-secondary">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {mockInvoices.map(invoice => (
                                <tr key={invoice.id} className="hover:bg-bg-secondary">
                                    <td className="p-3">{invoice.date}</td>
                                    <td className="p-3 font-medium">{invoice.item}</td>
                                    <td className="p-3">{invoice.amount}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                                            {invoice.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;