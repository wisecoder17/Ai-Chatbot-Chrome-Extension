require('dotenv').config({ path: '../../.env' });
const config = require("../config");

// const redis = require("../config/redis");
// const Context = require("../models/prompt");
// const axios = require("axios");

// class PromptManager {
//   static baseSystemPrompt = "You are a helpful AI assistant.";

//   static zeroShotPrompt(userInput) {
//     return [
//       { role: "system", content: this.baseSystemPrompt },
//       { role: "user", content: userInput },
//     ];
//   }
// }

// const callGPT = async (messages) => {
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages,
//         max_tokens: 1000,
//       },
//       {
//         headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("GPT API Error:", error.message);
//     throw new Error("Failed to call GPT API");
//   }
// };

// const handleChat = async (req, res) => {
//   const { query } = req.body;
//   const sessionId = "default-session";

//   try {
//     let context = await redis.get(sessionId);
//     if (!context) {
//       const dbContext = await Context.findOne({ sessionId });
//       context = dbContext ? dbContext.context : [];
//     } else {
//       context = JSON.parse(context);
//     }

//     const prompt = PromptManager.zeroShotPrompt(query);
//     context.push(...prompt);

//     const response = await callGPT(context);
//     context.push({ role: "assistant", content: response });

//     await redis.set(sessionId, JSON.stringify(context), "EX", 3600);
//     await Context.findOneAndUpdate(
//       { sessionId },
//       { context },
//       { upsert: true }
//     );

//     res.json({ response });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { handleChat };



// Chat with Streaming function!! 
const { GoogleGenerativeAI } = require("@google/generative-ai");

{
    // require('dotenv').config({ path: '../../.env' });
    // const config = require("../config");
    // // const redis = require("../config/redis"); // Redis temporarily disabled
    // // const Context = require("../models/prompt"); // DB temporarily disabled
    // const { GoogleGenerativeAI } = require("@google/generative-ai");

    // const genAI = new GoogleGenerativeAI(config.env.GEMINI_API_KEY);
    // const chatSessions = {}; // Temporary store for chat instances (Replace with Redis/DB later)

    // const handleChatStream = async (req, res) => {
    // const { query, sessionId } = req.body;

    // try {
    //     if (!sessionId) {
    //     return res.status(400).json({ error: "Missing sessionId" });
    //     }

    //     // Check if session exists; otherwise, create a new chat session
    //     if (!chatSessions[sessionId]) {
    //     chatSessions[sessionId] = genAI.chats.create({
    //         model: "gemini-1.5-flash",
    //         history: [],
    //     });
    //     }

    //     const chat = chatSessions[sessionId];

    //     // Set response headers for streaming
    //     res.setHeader("Content-Type", "text/event-stream");
    //     res.setHeader("Cache-Control", "no-cache");
    //     res.setHeader("Connection", "keep-alive");

    //     const stream = await chat.sendMessageStream({ message: query });

    //     for await (const chunk of stream) {
    //     res.write(`data: ${chunk.text}\n\n`); // Send each chunk as an event-stream
    //     }

    //     res.end(); // End the stream when response is complete

    // } catch (error) {
    //     console.error("Gemini API Streaming Error:", error.message);
    //     res.status(500).json({ error: "Failed to stream response from Gemini API" });
    // }
    // };

    // module.exports = { handleChatStream };
    // COMMENTS
    /* Uses sendMessageStream() for real-time streaming of responses.
    Sends chunks progressively instead of waiting for the full response.
    Uses Server-Sent Events (SSE) so the client receives updates as they arrive.*/
    
}

 // Temporarily disable Redis storage
    /*
    await redis.set(sessionId, JSON.stringify(context), "EX", 3600);
    await Context.findOneAndUpdate(
      { sessionId },
      { context },
      { upsert: true }
    );
    */



// clear all session
//chrome.storage.local.clear();
// get session
// chrome.storage.local.get(["user"], (result) => {
//     console.log(result.user);
// });
