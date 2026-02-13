import { AGENT_SYSTEM_PROMPTS, RAM_EESH_KNOWLEDGE_BASE } from "../data/knowledgeBase";

const API_KEY = import.meta.env.VITE_NVIDIA_API_KEY;
const API_URL = "/api/nvidia/v1/chat/completions";

/**
 * Helper to make API requests to NVIDIA
 */
async function makeNvidiaRequest(messages, maxTokens = 1024, temperature = 0.7) {
    if (!API_KEY) throw new Error("NVIDIA API Key is missing");

    const payload = {
        model: "moonshotai/kimi-k2.5",
        messages: messages,
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: 1.0,
        stream: false
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`NVIDIA API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("NVIDIA Request Failed:", error);
        throw error;
    }
}

/**
 * Unified Response Generator
 * Combines routing and generation into a single call for speed.
 */
export async function generateResponse(userQuery, chatHistory = []) {
    // 1. Construct the Master System Prompt
    const masterPrompt = `
    ${AGENT_SYSTEM_PROMPTS.Master}
    
    INSTITUTIONAL KNOWLEDGE BASE:
    ${JSON.stringify(RAM_EESH_KNOWLEDGE_BASE, null, 2)}
    `;

    // 2. Format Messages
    const messages = [
        { role: "system", content: masterPrompt }
    ];

    // Add history (mapped from UI format to API format)
    chatHistory.forEach(msg => {
        messages.push({
            role: msg.role === 'ai' ? 'assistant' : 'user',
            content: msg.content
        });
    });

    // Add current query
    messages.push({ role: "user", content: userQuery });

    try {
        return await makeNvidiaRequest(messages);
    } catch (error) {
        console.error("Generation Error:", error);
        return "I'm having trouble connecting to the Ram-Eesh server. Please try again in a moment.";
    }
}
