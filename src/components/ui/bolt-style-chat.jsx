import React, { useState, useRef, useEffect } from 'react';
import {
    Plus, Lightbulb, Paperclip, Image, FileCode,
    ChevronDown, Check, Sparkles, Zap, Brain, Bolt, Github,
    SendHorizontal, Mic, Volume2, VolumeX, Languages, GraduationCap, Briefcase,
    Menu, X, LayoutDashboard, Database, Calculator, MessageSquare, Search, Copy, CheckIcon, ArrowLeft,
    PanelLeftClose, PanelLeftOpen, Trash2, Settings, History, BookOpen, Quote, ChevronRight, ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { generateResponse } from '../../services/openrouter';
import ReactMarkdown from 'react-markdown';
import LeadCaptureModal from '../LeadCaptureModal';
import AdmissionForm from '../AdmissionForm';
import ContactForm from '../ContactForm';
import FeeCalculator from '../FeeCalculator';

// --- Simplified Xrio Components ---

const MeshBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#020503]">
        {/* Subtle, slower moving mesh */}
        <motion.div
            animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#D4FF4D]/5 blur-[100px] rounded-full opacity-40 pointer-events-none"
        />
        <motion.div
            animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1A4D2E]/10 blur-[80px] rounded-full opacity-30 pointer-events-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px] opacity-10" />
    </div>
);

const Navbar = ({ onNavigate, onOpenContact, onOpenAdmission }) => (
    <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-white/90 backdrop-blur-xl border border-white/20 rounded-full shadow-lg flex items-center gap-6"
    >
        <button
            onClick={() => onNavigate('landing')}
            className="text-[13px] font-bold text-black hover:text-[#1A4D2E] transition-colors tracking-tight uppercase flex items-center gap-2"
        >
            Ram-Eesh
        </button>
        <div className="h-4 w-px bg-gray-300 hidden sm:block" />
        <div className="hidden md:flex items-center gap-6">
            {[
                { name: "Academics", view: "academics" },
                { name: "Campus", view: "about" },
                { name: "Placements", view: "placements" }
            ].map((item) => (
                <button
                    key={item.name}
                    onClick={() => onNavigate(item.view)}
                    className="text-[11px] font-semibold text-gray-600 hover:text-black transition-colors uppercase tracking-wider"
                >
                    {item.name}
                </button>
            ))}
        </div>
        <button
            onClick={onOpenContact}
            className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-bold hover:bg-gray-800 transition-all uppercase tracking-wider shadow-md active:scale-95"
        >
            Contact <ChevronRight className="size-3" />
        </button>
    </motion.nav>
);

const UserMessage = ({ content }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-6"
    >
        <div className="max-w-[80%] bg-[#1A4D2E] text-white px-5 py-3 rounded-2xl rounded-tr-sm shadow-md border border-white/5 text-[15px] leading-relaxed">
            {content}
        </div>
    </motion.div>
);

const AIMessage = ({ content, thought, agent }) => {
    const [isThoughtOpen, setIsThoughtOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col mb-8"
        >
            <div className="flex items-center gap-2 mb-2 ml-3">
                <div className="size-6 rounded-lg bg-[#D4FF4D] flex items-center justify-center p-1 shadow-sm">
                    <Sparkles className="size-full text-black" />
                </div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{agent || "RAM-EESH AI"}</span>
            </div>

            {thought && (
                <div className="mb-3 ml-10">
                    <button
                        onClick={() => setIsThoughtOpen(!isThoughtOpen)}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D4FF4D]/40 hover:text-[#D4FF4D] transition-colors"
                    >
                        <Brain className={cn("size-3 transition-transform", isThoughtOpen ? "rotate-90" : "")} />
                        <span>{isThoughtOpen ? "Hide Thought" : "Show Thought"}</span>
                    </button>
                    <AnimatePresence>
                        {isThoughtOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden border-l border-[#D4FF4D]/10 mt-2 ml-1 px-3 py-2"
                            >
                                <p className="text-[12px] text-white/30 italic font-mono leading-relaxed">
                                    {thought}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            <div className="max-w-[90%] bg-white/[0.03] backdrop-blur-md border border-white/10 text-white/90 px-6 py-5 rounded-3xl rounded-tl-sm shadow-lg relative group transition-colors hover:bg-white/[0.04]">
                <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                        components={{
                            p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed text-[15px]" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-[#D4FF4D] font-bold" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-3 space-y-1 opacity-90" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
                <button
                    className="absolute bottom-4 right-4 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 text-white/30 hover:text-white"
                    onClick={() => navigator.clipboard.writeText(content)}
                >
                    <Copy className="size-3.5" />
                </button>
            </div>
        </motion.div>
    );
};

export default function BoltStyleChat({ onBack, onNavigate }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isFeeOpen, setIsFeeOpen] = useState(false);

    const scrollEndRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [inputValue]);

    const handleSendMessage = async (textOverride) => {
        const text = textOverride || inputValue;
        if (!text.trim() || isTyping) return;

        setMessages(prev => [...prev, { role: "user", content: text }]);
        setInputValue("");
        setIsTyping(true);

        try {
            const response = await generateResponse(text, messages.slice(-4));
            const thought = `Processing query. Accessing knowledge base. Generating response for "${text.slice(0, 20)}..."`;
            setMessages(prev => [...prev, { role: "ai", content: response, thought, agent: "Ram-Eesh AI" }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", content: "Connection interrupted. Please verify API key.", agent: "System" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="relative h-screen w-full flex flex-col font-sans selection:bg-[#D4FF4D]/30 overflow-hidden bg-[#020503]">
            <MeshBackground />

            <Navbar
                onNavigate={onNavigate}
                onOpenContact={() => setIsContactOpen(true)}
                onOpenAdmission={() => setIsAdmissionOpen(true)}
            />

            <AdmissionForm isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />
            <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <FeeCalculator isOpen={isFeeOpen} onClose={() => setIsFeeOpen(false)} />

            {/* Simple Back Button */}
            <button
                onClick={onBack}
                className="fixed top-6 left-6 z-50 size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
                <ArrowLeft className="size-4" />
            </button>

            {/* Main Content */}
            <main className="flex-1 relative z-10 overflow-y-auto scrollbar-hide">
                <div className="max-w-3xl mx-auto min-h-full flex flex-col px-6 md:px-0">

                    {messages.length === 0 ? (
                        // --- Simplified Hero ---
                        <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-32">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-12 relative w-full"
                            >
                                {/* Background Branding - Scaled Down */}
                                <h1 className="text-[6rem] md:text-[8rem] font-bold text-white leading-none tracking-tighter opacity-[0.03] select-none uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                                    RAM-EESH
                                </h1>

                                {/* Foreground Title */}
                                <div className="relative z-10">
                                    <h2 className="text-4xl md:text-6xl font-extrabold text-[#D4FF4D] tracking-tight mb-2">
                                        Intelligent Future.
                                    </h2>
                                    <p className="text-white/40 font-bold tracking-[0.3em] uppercase text-xs">
                                        Institutional AI Explorer
                                    </p>
                                </div>
                            </motion.div>

                            {/* Input Container - Clean & Simple */}
                            <div className="w-full max-w-2xl px-4 relative z-20">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-[#D4FF4D]/10 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                    <div className="relative rounded-3xl bg-black/80 border border-white/10 p-1 shadow-2xl backdrop-blur-xl">
                                        <div className="flex flex-col p-4">
                                            <textarea
                                                ref={textareaRef}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                                placeholder="What do you want to know?"
                                                className="w-full bg-transparent border-0 focus:ring-0 text-white placeholder:text-white/20 text-lg font-medium resize-none min-h-[50px] max-h-[150px] leading-relaxed mb-2"
                                                rows={1}
                                            />
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
                                                        <Paperclip className="size-5" />
                                                    </button>
                                                    <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
                                                        <Mic className="size-5" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleSendMessage()}
                                                    disabled={!inputValue.trim()}
                                                    className="bg-[#D4FF4D] text-black px-6 py-2 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                                                >
                                                    Explore <SendHorizontal className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Chips */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 flex flex-wrap justify-center gap-3"
                                >
                                    {[
                                        "Admission Deadlines",
                                        "Popular Courses",
                                        "Placement Record",
                                        "Campus Life"
                                    ].map((label) => (
                                        <button
                                            key={label}
                                            onClick={() => handleSendMessage(label)}
                                            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/40 text-[11px] font-bold hover:border-[#D4FF4D]/50 hover:text-[#D4FF4D] hover:bg-[#D4FF4D]/5 transition-all uppercase tracking-wide"
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        // --- Chat List ---
                        <div className="flex-1 py-32 px-4 w-full">
                            {messages.map((msg, i) => (
                                msg.role === "user"
                                    ? <UserMessage key={i} content={msg.content} />
                                    : <AIMessage key={i} {...msg} />
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 ml-4"
                                >
                                    <div className="flex gap-1.5">
                                        <div className="size-1.5 bg-[#D4FF4D] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="size-1.5 bg-[#D4FF4D] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="size-1.5 bg-[#D4FF4D] rounded-full animate-bounce" />
                                    </div>
                                    <span className="text-[10px] font-bold text-[#D4FF4D]/40 uppercase tracking-widest">Thinking</span>
                                </motion.div>
                            )}
                            <div ref={scrollEndRef} className="h-20" />
                        </div>
                    )}
                </div>
            </main>

            {/* Persistent Input Bar */}
            <AnimatePresence>
                {messages.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
                    >
                        <div className="relative rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-2 shadow-2xl flex items-center gap-3 pl-4 pr-2">
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                placeholder="Send a message..."
                                className="flex-1 bg-transparent border-0 focus:ring-0 text-white placeholder:text-white/20 py-3 text-[15px] font-medium resize-none max-h-[100px] scrollbar-hide"
                                rows={1}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-[#D4FF4D] text-black size-10 rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-lg shrink-0"
                            >
                                <SendHorizontal className="size-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
