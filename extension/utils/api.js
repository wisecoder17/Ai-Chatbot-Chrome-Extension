export const sendQuery = async (query) => {
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch response from backend: " + error.message);
    }
  };
