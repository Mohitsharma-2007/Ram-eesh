import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const LeadCaptureModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        courseInterest: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white/10 border border-white/20 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Future</h2>
                        <p className="text-gray-300 mb-6 text-sm">
                            Get personalized counseling and scholarship details from Ram-Eesh Institutions.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-ram-eesh-gold outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-ram-eesh-gold outline-none transition-colors"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-ram-eesh-gold outline-none transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Interested Course</label>
                                <select
                                    name="courseInterest"
                                    value={formData.courseInterest}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-ram-eesh-gold outline-none transition-colors"
                                >
                                    <option value="" className="bg-slate-900">Select a course</option>
                                    <option value="B.Pharm" className="bg-slate-900">B.Pharm</option>
                                    <option value="D.Pharm" className="bg-slate-900">D.Pharm</option>
                                    <option value="CSE" className="bg-slate-900">Computer Science (Diploma)</option>
                                    <option value="Other" className="bg-slate-900">Other</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-ram-eesh-gold to-yellow-600 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center justify-center gap-2 mt-4"
                            >
                                <span>Request Info</span>
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
