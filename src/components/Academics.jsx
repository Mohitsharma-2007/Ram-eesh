import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Microscope, Users, Sparkles, Binary } from 'lucide-react';

const courses = [
    { title: "B.Pharmacy", duration: "4 Yrs", type: "UG", icon: <Microscope className="size-5" />, bg: "bg-blue-50", color: "text-blue-600" },
    { title: "D.Pharmacy", duration: "2 Yrs", icon: <Clock className="size-5" />, bg: "bg-orange-50", color: "text-orange-600" },
    { title: "B.Ed", duration: "2 Yrs", type: "EDU", icon: <Users className="size-5" />, bg: "bg-purple-50", color: "text-purple-600" },
    { title: "M.Pharmacy", duration: "2 Yrs", type: "PG", icon: <Sparkles className="size-5" />, bg: "bg-emerald-50", color: "text-emerald-600" },
];

export default function Academics({ onBack }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-emerald-100/50">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button onClick={onBack} className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold tracking-tight">Ram-Eesh AI</span>
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
                        Academic Programs
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 max-w-2xl leading-relaxed"
                    >
                        Industry-focused curricula across Pharmacy, Education, and Engineering to prepare you for the global stage.
                    </motion.p>
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(200px,auto)] md:auto-rows-[200px]">

                    {/* Primary Focus Card - Pharmacy */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-2 rounded-3xl bg-emerald-600 border border-emerald-500 p-8 flex flex-col items-start relative overflow-hidden text-white shadow-xl shadow-emerald-100 min-h-[300px] md:min-h-0"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Microscope className="size-64" />
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                            Flagship Institute
                        </div>
                        <h2 className="text-3xl font-extrabold mb-4">Ram-Eesh Institute of Vocational and Technical Education (RIVTE)</h2>
                        <p className="text-emerald-50 max-w-xl text-lg opacity-90 leading-relaxed mb-6">
                            One of the premier pharmacy institutes in North India, offering comprehensive B.Pharm, D.Pharm, and M.Pharm programs with state-of-the-art laboratory facilities.
                        </p>
                        <div className="mt-auto flex items-center gap-4">
                            <div className="text-sm font-bold border-b-2 border-white pb-1">PCI & AICTE Approved</div>
                        </div>
                    </motion.div>

                    {/* Course Quick Grid - 4 small cells handled as one bento card set */}
                    {courses.map((course, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="md:col-span-4 md:row-span-1 rounded-3xl bg-white border border-gray-200/60 p-6 flex items-center gap-5 group hover:shadow-lg transition-all"
                        >
                            <div className={`size-12 rounded-2xl ${course.bg} ${course.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                {course.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">{course.title}</h3>
                                <div className="text-xs font-bold text-gray-400 mt-0.5 tracking-wide">{course.duration} Program</div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Future Tech Card - Wide/Bottom */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-1 rounded-3xl bg-gray-900 text-white p-8 flex items-center justify-between border border-gray-800"
                    >
                        <div className="flex items-center gap-6">
                            <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                <Binary className="size-7 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Engineering (RIET)</h3>
                                <p className="text-sm text-gray-400 max-w-sm">Upcoming expansions into Computer Science and Emerging Technologies.</p>
                            </div>
                        </div>
                        <div className="hidden lg:block text-xs font-bold text-gray-500 uppercase tracking-widest border border-gray-800 px-4 py-2 rounded-full">
                            Enrollment Status: Check via Chat
                        </div>
                    </motion.div>

                    {/* Teacher Education Card - Tall-ish */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 md:row-span-1 border border-gray-200/60 bg-white rounded-3xl p-6 flex flex-col justify-center shadow-sm"
                    >
                        <h3 className="text-lg font-extrabold text-gray-900 mb-2">Ram-Eesh Institute of Education</h3>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                            Imparting excellence in B.Ed & B.El.Ed to shape the next generation of educators.
                        </p>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
