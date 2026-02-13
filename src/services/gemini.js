import { GoogleGenerativeAI } from "@google/generative-ai";
import { RAM_EESH_KNOWLEDGE_BASE, AGENT_SYSTEM_PROMPTS } from "../data/knowledgeBase";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
let genAI = null;
let model = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    // Using trusted backend (visually 2.5 Flash)
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
} else {
    console.warn("Gemini API Key is missing!");
}

/**
 * Robust request handler with exponential backoff for 429 errors.
 */
async function makeRobustRequest(requestFn, maxRetries = 5) {
    if (!model) throw new Error("API Key Missing");

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await requestFn();
        } catch (error) {
            // Check for 429 (Too Many Requests) or Service Unavailable
            if (error.message.includes("429") || error.message.includes("503")) {
                const waitTime = Math.pow(2, i) * 5000 + Math.random() * 2000; // Aggressive backoff: 5s, 10s, 20s...
                console.warn(`Gemini API Error (Attempt ${i + 1}): ${error.message}. Retrying in ${waitTime}ms...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            } else {
                throw error; // Rethrow other errors immediately
            }
        }
    }
    throw new Error("Maximum retries exceeded. The server is busy.");
}

/**
 * Simulates the Multi-Agent Router.
 */
export async function routeQuery(userQuery) {
    if (!model) return { agent: "Support", intent: "No API Key" };

    const prompt = `
    ${AGENT_SYSTEM_PROMPTS.Router}
    
    User Query: "${userQuery}"
  `;

    try {
        const result = await makeRobustRequest(() => model.generateContent(prompt));
        const response = result.response;
        const text = response.text();
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Routing Error:", error);
        // Fallback logic on error
        return { agent: "Support", intent: "Fallback due to error" };
    }
}

/**
 * Generates the actual response.
 */
export async function generateResponse(agentName, userQuery, chatHistory = []) {
    if (!model) return "Please provide a valid Gemini API Key to start chatting.";

    const systemPrompt = AGENT_SYSTEM_PROMPTS[agentName.replace(" Agent", "")] || AGENT_SYSTEM_PROMPTS.Support;

    // Construct context (Truncate if needed to save tokens)
    let contextData = "";
    if (agentName.includes("Admission")) contextData = JSON.stringify(RAM_EESH_KNOWLEDGE_BASE.admissions);
    else if (agentName.includes("Course")) contextData = JSON.stringify(RAM_EESH_KNOWLEDGE_BASE.colleges);
    else if (agentName.includes("Campus")) contextData = JSON.stringify(RAM_EESH_KNOWLEDGE_BASE.campus_facilities);
    else if (agentName.includes("Placement")) contextData = JSON.stringify(RAM_EESH_KNOWLEDGE_BASE.placements);
    else if (agentName.includes("Event")) contextData = JSON.stringify(RAM_EESH_KNOWLEDGE_BASE.events);
    else contextData = JSON.stringify(RAM_EESH_KNOWLEDGE_BASE.institution);

    const fullPrompt = `
    System Context: ${systemPrompt}
    Institutional Data: ${contextData}
    
    Current Conversation History:
    ${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    User: ${userQuery}
    Assistant:
  `;

    try {
        const result = await makeRobustRequest(() => model.generateContent(fullPrompt));
        return result.response.text();
    } catch (error) {
        console.error("Generation Error:", error);
        if (error.message.includes("429") || error.message.includes("busy")) {
            return "I'm currently receiving a high volume of requests. Please try again in a few seconds.";
        }
        return "I'm having trouble connecting. Please check your internet or try again later.";
    }
}
