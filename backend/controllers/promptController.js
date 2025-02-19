////
const redis = require("../config/redis");
const Context = require("../models/prompt");
const axios = require("axios");

class PromptManager {
  static baseSystemPrompt = "You are a helpful AI assistant.";

  static zeroShotPrompt(userInput) {
    return [
      { role: "system", content: this.baseSystemPrompt },
      { role: "user", content: userInput },
    ];
  }
}

const callGPT = async (messages) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 1000,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GPT API Error:", error.message);
    throw new Error("Failed to call GPT API");
  }
};

const handleChat = async (req, res) => {
  const { query } = req.body;
  const sessionId = "default-session";

  try {
    let context = await redis.get(sessionId);
    if (!context) {
      const dbContext = await Context.findOne({ sessionId });
      context = dbContext ? dbContext.context : [];
    } else {
      context = JSON.parse(context);
    }

    const prompt = PromptManager.zeroShotPrompt(query);
    context.push(...prompt);

    const response = await callGPT(context);
    context.push({ role: "assistant", content: response });

    await redis.set(sessionId, JSON.stringify(context), "EX", 3600);
    await Context.findOneAndUpdate(
      { sessionId },
      { context },
      { upsert: true }
    );

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleChat };
