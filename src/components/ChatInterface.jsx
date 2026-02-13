import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle, UserPlus, Volume2, VolumeX, Languages } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { routeQuery, generateResponse } from '../services/gemini';
import MessageBubble from './MessageBubble';
import AgentAvatar from './AgentAvatar';
import LeadCaptureModal from './LeadCaptureModal';
import 'regenerator-runtime/runtime';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "Namaste! I am the Ram-Eesh AI Assistant. How can I help you today? \n\nYou can ask me about:\n- Admissions\n- Courses (Pharmacy, Engineering)\n- Campus Facilities\n- Placements",
            agent: "Support Agent"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeAgent, setActiveAgent] = useState("Support Agent");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'

    const messagesEndRef = useRef(null);

    // Voice Input Setup
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (transcript) {
            setInputValue(transcript);
        }
    }, [transcript]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Text to Speech
    const speakText = (text) => {
        if (!isSoundOn) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        resetTranscript();
        setIsTyping(true);

        try {
            // 1. Determine Intent & Agent
            // We append language instruction to the router query implicitly by context, 
            // but for generation we will be explicit.
            const routingResult = await routeQuery(userMsg.content);
            const targetAgent = routingResult.agent || "Support Agent";
            setActiveAgent(targetAgent);

            // 2. Generate Response
            const langContext = language === 'hi' ? "Reply in Hindi language using Devanagari script mixed with English technical terms." : "Reply in English.";
            const responseText = await generateResponse(targetAgent, `${langContext} ${userMsg.content}`, messages.slice(-5));

            const aiMsg = {
                role: 'ai',
                content: responseText,
                agent: targetAgent
            };

            setMessages(prev => [...prev, aiMsg]);
            speakText(responseText.replace(/[*#]/g, '')); // Clean markdown for speech

            // Trigger Lead Modal logic
            if (targetAgent === "Admission Agent" && !isModalOpen && Math.random() > 0.7) {
                setTimeout(() => setIsModalOpen(true), 3000);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'ai', content: "I apologize, but I'm encountering a connection issue. Please try again.", agent: "System" }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'hi' : 'en';
        setLanguage(newLang);
        const greeting = newLang === 'hi' ? "नमस्ते! मैं राम-ईश एआई असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकता हूँ?" : "Namaste! I am the Ram-Eesh AI Assistant. How can I help you today?";
        setMessages(prev => [...prev, { role: 'ai', content: greeting, agent: "System" }]);
        speakText(greeting);
    };

    if (!browserSupportsSpeechRecognition) {
        // Fallback UI or silent fail
    }

    return (
        <div className="flex flex-col h-[85vh] w-full max-w-4xl mx-auto bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">

            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) => {
                    console.log("Lead Data:", data);
                    setMessages(prev => [...prev, { role: 'ai', content: `Thanks ${data.name}! We have received your details.`, agent: "System" }]);
                }}
            />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                    <AgentAvatar agentName={activeAgent} isTyping={isTyping} />
                    <div>
                        <h2 className="text-lg font-semibold text-white">{activeAgent}</h2>
                        <p className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={toggleLanguage}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1 text-xs"
                        title="Switch Language"
                    >
                        <Languages size={16} />
                        <span>{language === 'en' ? 'EN' : 'HI'}</span>
                    </button>
                    <button
                        onClick={() => setIsSoundOn(!isSoundOn)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                        title="Toggle Sound"
                    >
                        {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-ram-eesh-gold/20 text-ram-eesh-gold border border-ram-eesh-gold/50 rounded-lg hover:bg-ram-eesh-gold/30 transition-all text-sm font-medium"
                    >
                        <UserPlus size={16} />
                        <span className="hidden sm:inline">Apply/Enquire</span>
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} message={msg} />
                ))}
                {isTyping && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 border border-white/10 focus-within:border-ram-eesh-gold/50 transition-all">
                    <button
                        onClick={listening ? SpeechRecognition.stopListening : () => SpeechRecognition.startListening({ language: language === 'hi' ? 'hi-IN' : 'en-IN' })}
                        className={`p-2 rounded-full transition-colors ${listening ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        title="Voice Input"
                    >
                        {listening ? <StopCircle size={20} className="animate-pulse" /> : <Mic size={20} />}
                    </button>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={language === 'hi' ? "यहाँ टाइप करें..." : "Ask about admissions, courses..."}
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 py-2"
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className={`p-2 rounded-full transition-all ${inputValue.trim() ? 'bg-ram-eesh-gold text-black hover:bg-yellow-500' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
