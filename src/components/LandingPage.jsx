import React from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, ArrowRight, GraduationCap, Building2, MapPin, Briefcase,
    BookOpen, Users, Trophy, Star, ChevronRight, MessageSquare
} from 'lucide-react';

const agents = [
    {
        id: 'admission',
        title: 'Admissions',
        desc: 'Fees, Deadlines, & Process',
        icon: <GraduationCap className="size-6 text-pink-600" />,
        bg: 'bg-pink-50',
        border: 'border-pink-100',
        text: 'text-pink-900'
    },
    {
        id: 'course',
        title: 'Courses',
        desc: 'Syllabus, Faculty, & Departments',
        icon: <BookOpen className="size-6 text-blue-600" />,
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        text: 'text-blue-900'
    },
    {
        id: 'campus',
        title: 'Campus Life',
        desc: 'Hostels, Labs, & Sports Complex',
        icon: <Building2 className="size-6 text-green-600" />,
        bg: 'bg-green-50',
        border: 'border-green-100',
        text: 'text-green-900'
    },
    {
        id: 'placement',
        title: 'Placements',
        desc: 'Top Recruiters, Alumni & Packages',
        icon: <Briefcase className="size-6 text-purple-600" />,
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        text: 'text-purple-900'
    }
];

const features = [
    { icon: <Users className="size-5" />, text: "24/7 Student Support" },
    { icon: <Trophy className="size-5" />, text: "Ranked Top Pharmacy College" },
    { icon: <Star className="size-5" />, text: "AI-Powered Assistance" }
];

export default function LandingPage({ onStart, onNavigate }) {
    return (
        <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden font-sans selection:bg-blue-100">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" onError={(e) => e.target.style.display = 'none'} /> */}
                        <span className="text-lg font-bold tracking-tight text-gray-900">Ram-Eesh AI</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition-colors">About</button>
                        <button onClick={() => onNavigate('academics')} className="hover:text-blue-600 transition-colors">Academics</button>
                        <button onClick={() => onNavigate('placements')} className="hover:text-blue-600 transition-colors">Placements</button>
                        <button
                            onClick={onStart}
                            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-black transition-colors"
                        >
                            Try AI Assistant
                        </button>
                    </div>
                </div>
            </nav>

            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-purple-100/50 rounded-full blur-[80px]" />
            </div>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-semibold text-blue-700 mb-6"
                    >
                        <Sparkles className="size-4 fill-blue-700" />
                        <span>Admissions Open 2026-27</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]"
                    >
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Campus Assistance
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed"
                    >
                        Experience instant answers for all your queries.
                        From admission details to placement records, our AI assistant is here to guide you 24/7.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
                    >
                        <button
                            onClick={onStart}
                            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                        >
                            <MessageSquare className="size-5" />
                            Start Chatting
                        </button>
                    </motion.div>

                    {/* Features List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium text-gray-500"
                    >
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="p-1 rounded-full bg-gray-100">{f.icon}</div>
                                {f.text}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Side Cards / Visuals */}
                <div className="flex-1 w-full max-w-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-[100px] opacity-30" />
                    {/* Campus Image  */}
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-6 transform hover:scale-[1.02] transition-transform duration-500">
                        <img
                            src="/hero_campus.png"
                            alt="Ram-Eesh Campus"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white font-semibold">Ram-Eesh Group of Institutions</p>
                            <p className="text-white/80 text-sm">Greater Noida, UP</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
                    >
                        {agents.slice(0, 2).map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                whileHover={{ y: -5 }}
                                className={`p-4 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 flex flex-col gap-3`}
                            >
                                <div className={`size-10 rounded-xl flex items-center justify-center ${agent.bg} ${agent.text}`}>
                                    {agent.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-md mb-1">{agent.title}</h3>
                                    <p className="text-xs text-gray-500 leading-snug">{agent.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-100 bg-gray-50/50 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Trusted by 10,000+ Students</p>
                        <p className="text-xs text-gray-500 mt-1">Providing excellence in education since 1986.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
