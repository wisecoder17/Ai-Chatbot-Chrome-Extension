require('dotenv').config({ path: '../../.env' });
const config = require("../config");
// const redis = require("../config/redis"); // Redis temporarily disabled
// const Context = require("../models/prompt"); // DB temporarily disabled
const { GoogleGenAI } = require("@google/genai");

class PromptManager {
  static systemInstruction() {
    return "You are a helpful AI assistant. Keep responses concise.";
  }

  static formatUserMessage(userInput) {
    return { role: "user", parts: [{ text: userInput }] };
  }

  static formatModelMessage(responseText) {
    return { role: "model", parts: [{ text: responseText }] };
  }
}

let conversationHistory = [];
const createChatSession = async () => {
  const genAI = new GoogleGenAI({ apiKey: config.env.GEMINI_API_KEY });

  const chat = genAI.chats.create({
    model: "gemini-2.0-flash",
    history: conversationHistory, // Start with an empty conversation history
    config: {
      systemInstruction: PromptManager.systemInstruction(),
      temperature: 0.7, 
      maxOutputTokens: 500,
    },
  });
  return chat;
  
};
console.log(conversationHistory);


const handleChat = async (req, res) => {
  const { query, sessionId } = req.body;

  try {
    // Initialize or retrieve chat session (replace with Redis/DB logic later)
    if (!global.chatSessions) global.chatSessions = {};
    if (!global.chatSessions[sessionId]) {
      global.chatSessions[sessionId] = await createChatSession();
    }
    const chat = global.chatSessions[sessionId];

    // Send user message
    const response = await chat.sendMessage({ message: query });

    // Log session ID and response
    console.log(`Session ID: ${sessionId}`);
    console.log("AI Response:", response.text);

    res.json({ sessionId, response: response.text });

  } catch (error) {
    console.error("Chat Handling Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChat };
