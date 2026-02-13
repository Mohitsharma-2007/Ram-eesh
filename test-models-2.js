import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCIgKFSkS44hz1AbInykNlzwMnRDFRXwGM";

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    console.log("Testing gemini-2.0-flash-exp...");
    try {
        const m = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const result = await m.generateContent("Test");
        console.log("SUCCESS: gemini-2.0-flash-exp");
        console.log(result.response.text());
    } catch (e) {
        console.log(`FAILED: gemini-2.0-flash-exp - ${e.message}`);
    }

    console.log("Testing gemini-2.0-flash...");
    try {
        const m = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await m.generateContent("Test");
        console.log("SUCCESS: gemini-2.0-flash");
        console.log(result.response.text());
    } catch (e) {
        console.log(`FAILED: gemini-2.0-flash - ${e.message}`);
    }
}

listModels();
