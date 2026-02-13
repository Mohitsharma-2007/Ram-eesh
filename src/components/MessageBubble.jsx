import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import AgentAvatar from './AgentAvatar';
import { User } from 'lucide-react';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex max-w-[80%] md:max-w-[70%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {isUser ? (
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center border border-white/10">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                    ) : (
                        <AgentAvatar agentName={message.agent || "Assistant"} />
                    )}
                </div>

                {/* Bubble */}
                <div className={`relative px-5 py-3 rounded-2xl text-sm md:text-base shadow-md backdrop-blur-md
          ${isUser
                        ? 'bg-ram-eesh-blue/80 text-white rounded-tr-none border border-white/10'
                        : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5'
                    }`}
                >
                    {/* Agent Label */}
                    {!isUser && (
                        <div className="text-xs font-bold text-ram-eesh-gold mb-1 uppercase tracking-wide opacity-80">
                            {message.agent || "Ram-Eesh Assistant"}
                        </div>
                    )}

                    <div className="markdown-content">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
