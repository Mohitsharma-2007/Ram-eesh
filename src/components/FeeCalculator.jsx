import React, { useState } from 'react';
import { X, Calculator, IndianRupee } from 'lucide-react';

export default function FeeCalculator({ isOpen, onClose }) {
    const [course, setCourse] = useState('B.Pharmacy');
    const [hostel, setHostel] = useState('No');
    const [transport, setTransport] = useState('No');

    if (!isOpen) return null;

    const getFees = () => {
        let baseFee = 0;
        switch (course) {
            case 'B.Pharmacy': baseFee = 95000; break;
            case 'D.Pharmacy': baseFee = 80000; break;
            case 'B.Ed': baseFee = 55000; break;
            case 'BBA': baseFee = 60000; break;
            case 'BCA': baseFee = 65000; break;
            default: baseFee = 50000;
        }

        let total = baseFee;
        if (hostel === 'Yes') total += 75000;
        if (transport === 'Yes') total += 15000;

        return { base: baseFee, total: total };
    };

    const fees = getFees();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <Calculator className="size-5 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900">Fee Calculator</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="size-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Controls */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Course</label>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option>B.Pharmacy</option>
                                <option>D.Pharmacy</option>
                                <option>B.Ed</option>
                                <option>BBA</option>
                                <option>BCA</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer" onClick={() => setHostel(h => h === 'Yes' ? 'No' : 'Yes')}>
                            <span className="font-medium text-gray-700">Include Hostel?</span>
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${hostel === 'Yes' ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'}`}>
                                <div className="size-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer" onClick={() => setTransport(t => t === 'Yes' ? 'No' : 'Yes')}>
                            <span className="font-medium text-gray-700">Include Transport?</span>
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors flex items-center ${transport === 'Yes' ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'}`}>
                                <div className="size-4 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-5 text-white shadow-lg shadow-blue-200">
                        <div className="flex justify-between items-center mb-2 text-blue-100 text-sm">
                            <span>Tuition Fee (Yearly)</span>
                            <span>₹{fees.base.toLocaleString()}</span>
                        </div>
                        {hostel === 'Yes' && (
                            <div className="flex justify-between items-center mb-1 text-blue-100 text-sm">
                                <span>Hostel Fee</span>
                                <span>+ ₹75,000</span>
                            </div>
                        )}
                        {transport === 'Yes' && (
                            <div className="flex justify-between items-center mb-3 text-blue-100 text-sm">
                                <span>Transport Fee</span>
                                <span>+ ₹15,000</span>
                            </div>
                        )}
                        <div className="h-px bg-white/20 my-3" />
                        <div className="flex justify-between items-end">
                            <span className="font-medium opacity-90">Total Estimated Fee</span>
                            <div className="text-3xl font-bold flex items-center">
                                <IndianRupee className="size-5 mr-1" />
                                {fees.total.toLocaleString()}
                            </div>
                        </div>
                        <p className="text-[10px] opacity-60 mt-2 text-right">*Fees are subject to change. Contact admin for final quote.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
