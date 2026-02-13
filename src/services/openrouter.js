import { KNOWLEDGE_BASE } from '../data/knowledge';

// Use the Gemini API Key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Fallback mock responses
const MOCK_RESPONSES = {
    default: "I am currently in **Offline Simulation Mode**. \n\n*Please check your Gemini API Key configuration.*",
    admissions: "Admissions are currently open for the 2025-26 session! You can apply online via the 'Admissions' tab on our website or visit our campus in Greater Noida.",
    courses: "We offer B.Tech (CSE, ECE, ME, CE), B.Pharma, M.Pharma, B.Ed, and Diploma programs. Which one are you interested in?",
    placements: "Our placement record is outstanding, with top recruiters like TCS, Wipro, and Cipla visiting every year. The highest package recently was 12 LPA."
};

export const generateResponse = async (prompt, history = []) => {
    // 1. Check for API Key
    if (!GEMINI_API_KEY) {
        console.warn("Gemini API Key missing!");
        const lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.includes("admission")) return MOCK_RESPONSES.admissions;
        if (lowerPrompt.includes("course")) return MOCK_RESPONSES.courses;
        if (lowerPrompt.includes("placement")) return MOCK_RESPONSES.placements;
        return MOCK_RESPONSES.default;
    }

    // 2. Format History for Gemini API
    // Gemini expects: { role: "user" | "model", parts: [{ text: "..." }] }
    const contents = history.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    // Add valid user prompt
    contents.push({
        role: "user",
        parts: [{ text: prompt }]
    });

    const systemInstruction = `You are Ram-Eesh AI, the official assistant for Ram-Eesh Group of Institutions. 
    Your goal is to help students, parents, and visitors with information about admissions, courses, campus life, and placements.
    
    You have access to the following INTERNAL KNOWLEDGE BASE for specific institutional details:
    ${KNOWLEDGE_BASE}
    
    IMPORTANT INSTRUCTIONS:
    1. PRIORITIZE the Knowledge Base for specific queries about Ram-Eesh (fees, specific course details, campus rules).
    2. FOR GENERAL QUERIES or if the information is missing from the Knowledge Base, YOU ARE ALLOWED TO USE YOUR GENERAL KNOWLEDGE and ONLINE INFORMATION.
    3. Do not be restricted solely to the provided text. If a user asks about general topics (e.g., "What is B.Pharma?", "Scope of CSE"), answer broadly using your training data.
    4. Be friendly, professional, and concise.
    5. You can answer in English or Hindi.`;

    try {
        // Using Gemini 1.5 Pro (best available stable model, as 3.0 is not yet released)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: contents,
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return aiResponse || "Sorry, I couldn't generate a response using Gemini.";

    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return MOCK_RESPONSES.default;
    }
};
