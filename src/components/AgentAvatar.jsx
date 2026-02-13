import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, BookOpen, GraduationCap, Building2, Briefcase, Calendar, Phone } from 'lucide-react';

const AgentAvatar = ({ agentName = "Support Agent", isTyping = false }) => {

    const getAgentConfig = (name) => {
        if (name.includes("Admission")) return { icon: BookOpen, color: "bg-blue-500", glow: "shadow-blue-500/50" };
        if (name.includes("Course")) return { icon: GraduationCap, color: "bg-purple-500", glow: "shadow-purple-500/50" };
        if (name.includes("Campus")) return { icon: Building2, color: "bg-green-500", glow: "shadow-green-500/50" };
        if (name.includes("Placement")) return { icon: Briefcase, color: "bg-amber-500", glow: "shadow-amber-500/50" };
        if (name.includes("Event")) return { icon: Calendar, color: "bg-pink-500", glow: "shadow-pink-500/50" };
        return { icon: Shield, color: "bg-ram-eesh-gold", glow: "shadow-gold/50" }; // Support/Default
    };

    const config = getAgentConfig(agentName);
    const Icon = config.icon;

    return (
        <div className={`relative flex items-center justify-center w-12 h-12 rounded-full ${config.color} ${config.glow} shadow-lg border-2 border-white/20`}>
            <Icon className="w-6 h-6 text-white" />
            {isTyping && (
                <span className="absolute top-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
            )}
        </div>
    );
};

export default AgentAvatar;
