require('dotenv').config({ path: '../../.env' });
const config = require("../config");
// const redis = require("../config/redis"); // Redis temporarily disabled
const Context = require("../models/prompt");
const { GoogleGenerativeAI } = require("@google/generative-ai");

class PromptManager {
  static baseSystemPrompt(userInput) {
    return [
      {
        role: "user",
        parts: [{ text: "You are a helpful AI assistant. Keep responses concise." }]
      },
      {
        role: "user",
        parts: [{ text: userInput }]
      }
    ];
  }
}

const callGemini = async (query) => {
  try {
    const genAI = new GoogleGenerativeAI(config.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use latest model if available

    const requestPayload = { contents: query }; 

    const result = await model.generateContent(requestPayload);
    console.log("Gemini API Result:", result);    
    // Extract response correctly
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error("No valid response from Gemini API.");
    }

    console.log("Gemini Response:", responseText);
    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Failed to call Gemini API");
  }
};

const handleChat = async (req, res) => {
  const { query } = req.body;
  const sessionId = "default-session";

  try {
    // Temporarily disabling Redis for debugging
    let context = []; 
    
    // Prompt Manager
    const prompt = PromptManager.baseSystemPrompt(query);
    context.push(...prompt);

    // Call Gemini API with properly formatted messages
    const response = await callGemini(context);

    // Push assistant's response correctly
    context.push({
      role: "model",
      parts: [{ text: response }]
    });

    // Temporarily disable Redis storage
    /*
    await redis.set(sessionId, JSON.stringify(context), "EX", 3600);
    await Context.findOneAndUpdate(
      { sessionId },
      { context },
      { upsert: true }
    );
    */

    res.json({ response });
    console.log("Response:", response);
  } catch (error) {
    console.error("Error in handleChat:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChat };
