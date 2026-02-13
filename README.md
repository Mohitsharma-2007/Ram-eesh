# Ram-Eesh Institutional AI Assistant

An advanced, agentic AI Chatbot for Ram-Eesh Group of Institutions, featuring a premium glassmorphism UI, multi-agent architecture, and voice capabilities.

## 🌟 Features

- **Multi-Agent System**: Intelligent routing to specialized agents (Admission, Course, Campus, Placement).
- **Premium UI**: Modern "Academic Future" design with glassmorphism and smooth animations.
- **Voice Support**: Talk to the assistant and hear responses (English & Hindi).
- **Lead Capture**: Smartly detects user interest and collects admission details.
- **Multi-Language**: Toggle between English and Hindi.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure API Key**
    - Create a `.env` file in the root directory.
    - Add your Gemini API Key:
      ```env
      VITE_GEMINI_API_KEY=your_api_key_here
      ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    - Navigate to `http://localhost:5173` (or the URL shown in the terminal).

## 📁 Project Structure

- `src/components`: UI Components (ChatInterface, AgentAvatar, etc.)
- `src/services`: Gemini API integration and Router logic.
- `src/data`: Knowledge Base and System Prompts.
- `src/App.jsx`: Main entry point.

## 🛠️ Tech Stack
- React + Vite
- TailwindCSS
- Framer Motion
- Google Generative AI SDK
