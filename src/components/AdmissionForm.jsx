import React, { useState } from 'react';
import { X, SendHorizontal, CheckCircle } from 'lucide-react';

export default function AdmissionForm({ isOpen, onClose }) {
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Admission Enquiry</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="size-5 text-gray-500" />
                    </button>
                </div>

                {submitted ? (
                    <div className="p-12 flex flex-col items-center text-center">
                        <CheckCircle className="size-16 text-green-500 mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                        <p className="text-gray-500">Our admission team will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Enter your name" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <input required type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+91..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input required type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="name@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Course Interested In</label>
                            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                <option>B.Pharmacy</option>
                                <option>D.Pharmacy</option>
                                <option>B.Ed</option>
                                <option>D.El.Ed</option>
                                <option>BBA</option>
                                <option>BCA</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Message (Optional)</label>
                            <textarea className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24 resize-none" placeholder="Any specific questions?" />
                        </div>

                        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-2">
                            <span>Submit Enquiry</span>
                            <SendHorizontal className="size-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
