import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCIgKFSkS44hz1AbInykNlzwMnRDFRXwGM";

if (!API_KEY) {
    console.error("Please provide VITE_GEMINI_API_KEY in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init to get client
        // Actually the SDK doesn't expose listModels directly on the client instance easily in all versions, 
        // but we can try a direct fetch or just use a known stable model.
        // Let's just try to generate content with a few different aliases to see which one works.

        const aliases = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.5-pro", "gemini-pro"];

        for (const alias of aliases) {
            console.log(`Testing ${alias}...`);
            try {
                const m = genAI.getGenerativeModel({ model: alias });
                const result = await m.generateContent("Test");
                console.log(`SUCCESS: ${alias}`);
                console.log(result.response.text());
                break;
            } catch (e) {
                console.log(`FAILED: ${alias} - ${e.message}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
