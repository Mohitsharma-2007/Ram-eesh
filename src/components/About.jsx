import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Award, Target, History, Building } from 'lucide-react';

export default function About({ onBack }) {
    return (
        <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-blue-100/50">
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
                <div className="mb-12 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold tracking-tight mb-4"
                    >
                        About the Institutions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 max-w-2xl leading-relaxed mx-auto md:mx-0"
                    >
                        Rooted in legacy, driven by innovation. Since 1986, we've been crafting excellence in professional and technical education.
                    </motion.p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(180px,auto)] md:auto-rows-[180px]">

                    {/* Main Heritage Card - Large/Wide */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-8 md:row-span-2 rounded-3xl bg-white border border-gray-200/60 p-8 flex flex-col justify-end relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500 min-h-[300px] md:min-h-0"
                    >
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1599933353457-36e7a223bedb?q=80&w=2787&auto=format&fit=crop"
                                alt="Legacy"
                                className="w-full h-full object-cover grayscale opacity-10 group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        <div className="relative z-10">
                            <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                <History className="size-6" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">A Legacy of 38+ Years</h2>
                            <p className="text-gray-500 max-w-xl leading-relaxed">
                                Established in 1986 by Dr. R.C. Sharma, Ram-Eesh Group of Institutions has evolved from a vision into a sprawling center of academic excellence in Greater Noida. We pride ourselves on creating an environment where ethical values meet modern industry demands.
                            </p>
                        </div>
                    </motion.div>

                    {/* Chairman Card - Tall */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-4 md:row-span-3 rounded-3xl bg-blue-600 p-8 flex flex-col text-white shadow-xl shadow-blue-100 relative overflow-hidden min-h-[350px] md:min-h-0"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Target className="size-32" />
                        </div>
                        <div className="mt-auto relative z-10">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 border-2 border-white/20">
                                <img src="https://ui-avatars.com/api/?name=R+C+Sharma&background=fff&color=2563eb&size=128" alt="Chairman" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Chairman's Note</h3>
                            <p className="text-blue-50 font-medium italic mb-6 leading-relaxed">
                                "At Ram-Eesh, we believe in empowering students not just with degrees, but with values and skills that make them global citizens."
                            </p>
                            <div className="text-sm font-bold tracking-widest uppercase opacity-80">Dr. R.C. Sharma</div>
                        </div>
                    </motion.div>

                    {/* Quality Assurance Card - Square-ish */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4 md:row-span-2 rounded-3xl bg-white border border-gray-200/60 p-8 flex flex-col justify-start shadow-sm hover:shadow-md transition-all duration-500"
                    >
                        <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                            <Award className="size-5" />
                        </div>
                        <h3 className="text-lg font-bold mb-3">Excellence Guaranteed</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            All our programs are approved by statutory bodies like AICTE, PCI, and NCTE, ensuring your education is recognized globally.
                        </p>
                        <ul className="space-y-3">
                            {['AICTE Approved', 'PCI Accredited', 'NCTE Certified'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                    <CheckCircle className="size-3.5 text-emerald-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Location Card - Wide */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-4 md:row-span-1 rounded-3xl bg-gray-900 border border-gray-800 p-6 flex items-center gap-4 text-white hover:bg-black transition-colors"
                    >
                        <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                            <Building className="size-6 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Campus Location</div>
                            <div className="text-sm font-semibold">Greater Noida, Uttar Pradesh</div>
                        </div>
                    </motion.div>

                    {/* Mission Badge Card - Small/Quick */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-4 md:row-span-1 border border-gray-200/60 bg-white rounded-3xl p-6 flex flex-col justify-center gap-2 shadow-sm"
                    >
                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Our Core Vision</div>
                        <div className="text-sm font-bold text-gray-800">Imparting Quality Technical Education</div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
