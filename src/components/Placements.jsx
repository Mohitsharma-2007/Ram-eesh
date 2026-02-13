import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Users, Globe, Zap } from 'lucide-react';

const recruiters = [
    "Cipla", "Sun Pharma", "Ranbaxy", "Apollo Hospitals",
    "Fortis", "Jubilant", "TCS", "Wipro"
];

export default function Placements({ onBack }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-purple-100/50">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold tracking-tight text-gray-900">Ram-Eesh AI</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Intro Section */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold tracking-tight mb-4"
                    >
                        Placements & Careers
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 max-w-2xl leading-relaxed"
                    >
                        Connecting our talent with top-tier global recruiters. Our alumni lead in leading pharmaceutical and technical firms.
                    </motion.p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(180px,auto)] md:auto-rows-[200px]">

                    {/* Hero Stat - Highest Package */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-1 rounded-3xl bg-white border border-gray-200/60 p-8 flex items-center justify-between shadow-sm hover:shadow-md transition-all group min-h-[150px]"
                    >
                        <div className="flex items-center gap-8">
                            <div className="size-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                <Zap className="size-8" />
                            </div>
                            <div>
                                <div className="text-4xl font-black text-gray-900">12 LPA</div>
                                <div className="text-sm font-bold text-purple-600 uppercase tracking-widest mt-1">Highest Package 2024-25</div>
                            </div>
                        </div>
                        <Globe className="size-16 text-gray-50 hidden lg:block" />
                    </motion.div>

                    {/* Quick Stat - Alumnus */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 md:row-span-2 rounded-3xl bg-purple-600 p-8 text-white flex flex-col justify-between shadow-xl shadow-purple-100 min-h-[300px] md:min-h-0"
                    >
                        <Users className="size-10 text-purple-300" />
                        <div>
                            <div className="text-4xl font-black mb-2">15,000+</div>
                            <div className="text-sm font-bold text-purple-100/80 leading-snug">Global Alumni Network in 500+ Companies</div>
                        </div>
                    </motion.div>

                    {/* Stats List - Squares */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 md:row-span-1 rounded-3xl bg-white border border-gray-200/60 p-8 flex flex-col justify-center shadow-sm"
                    >
                        <div className="text-3xl font-black text-gray-900 mb-1">4.5 LPA</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Average Placement Package</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 md:row-span-1 rounded-3xl bg-gray-900 p-8 text-white flex flex-col justify-center border border-gray-800"
                    >
                        <div className="text-3xl font-black mb-1">50+</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Annual Corporate Partners</div>
                    </motion.div>

                    {/* Recruiters Bento Section - Large/Wide */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-12 md:row-span-1 rounded-3xl bg-white border border-gray-200/60 p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between overflow-hidden gap-6 min-h-[150px]"
                    >
                        <div className="flex items-center gap-4 shrink-0">
                            <Building2 className="size-6 text-gray-400" />
                            <h3 className="font-extrabold text-xl tracking-tight">Trusted by Industry Leaders</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recruiters.map((company, i) => (
                                <div key={i} className="px-5 py-2.5 rounded-2xl bg-[#F9FAFB] border border-gray-100 text-sm font-bold text-gray-700 hover:border-purple-200 transition-colors cursor-pointer">
                                    {company}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
