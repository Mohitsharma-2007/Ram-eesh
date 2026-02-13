import React, { useState } from 'react';
import { X, SendHorizontal, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactForm({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row">

                {/* Contact Info Sidebar */}
                <div className="bg-gray-900 text-white p-6 md:w-1/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-6">Contact Us</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="size-5 text-blue-400 mt-1" />
                                <p className="text-sm text-gray-300">Ram-Eesh Institute,<br />Greater Noida, UP,<br />India - 201310</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-blue-400" />
                                <p className="text-sm text-gray-300">+91 120 2322657</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-5 text-blue-400" />
                                <p className="text-sm text-gray-300">info@rameesh.org</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden relative">
                            {/* Placeholder for map */}
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">Map View</div>
                        </div>
                    </div>
                </div>

                {/* Form Area */}
                <div className="p-6 md:w-2/3">
                    <div className="flex justify-end mb-2">
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="size-5 text-gray-500" />
                        </button>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Send us a message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">First Name</label>
                                <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" placeholder="John" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-600">Last Name</label>
                                <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Email</label>
                            <input className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-600">Message</label>
                            <textarea className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm h-24 resize-none" placeholder="How can we help?" />
                        </div>
                        <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors">Send Message</button>
                    </form>
                </div>

            </div>
        </div>
    );
}
