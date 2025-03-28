import process from "../config.js";

export async function sendQuery(query, sessionId) {
  try {
    const response = await fetch(`${process.BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, sessionId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}
