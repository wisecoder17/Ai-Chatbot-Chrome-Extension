import process from "./config.js";
import { sendQuery } from "./utils/api.js";

// Ensure user session exists and redirect if needed
window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["user", "session", "SScache"], (result) => {
    const user = result.user;
    const session = result.session;
    const sessionExists = result.SScache;

    if (!user || !session || Date.now() > session.sessionExpiration) {
      if (sessionExists) {
        window.location.href = "login.html?error=Session expired. Please log in.";
      } else {
        window.location.href = "login.html";
      }
      chrome.storage.local.remove(["user", "session", "SScache"]);
    } else {
      document.getElementById("welcome-message").innerText = `Welcome, ${user.username}!`;
    }
  });
});

// Logout Functionality
document.getElementById("logout-button").addEventListener("click", async () => {
  chrome.storage.local.get("session", async (result) => {
    const session = result.session;
    
    if (session && session.sessionId) {
      try {
        const response = await fetch(`${process.BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sessionId: session.sessionId }),
        });

        if (response.ok) {
          chrome.storage.local.remove(["user", "session", "SScache"], () => {
            console.log("Logged out successfully");
            window.location.href = "login.html";
          });
        } else {
          console.error("Failed to log out");
        }
      } catch (error) {
        console.error("Logout failed", error);
      }
    } else {
      console.error("No session found in localStorage");
      window.location.href = "login.html";
    }
  });
});

// Handle sending queries and displaying messages
document.getElementById("send-button").addEventListener("click", async () => {
  const queryInput = document.getElementById("query");
  const messageContainer = document.getElementById("messages");
  const loadingElement = document.getElementById("loading");

  const query = queryInput.value.trim();
  if (!query) return;

  // Add user message to chat
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.innerText = query;
  messageContainer.appendChild(userMessage);

  queryInput.value = "";
  loadingElement.style.display = "block";

  // Retrieve sessionId from storage
  chrome.storage.local.get("session", async (result) => {
    const session = result.session;
    const sessionId = session ? session.sessionId : null;

    try {
      const data = await sendQuery(query, sessionId);
      
      // Add AI response to chat
      const botMessage = document.createElement("div");
      botMessage.className = "message bot-message";
      botMessage.innerText = data.response;
      messageContainer.appendChild(botMessage);
    } catch (error) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "message error-message";
      errorMessage.innerText = "Error: " + error.message;
      messageContainer.appendChild(errorMessage);
    } finally {
      loadingElement.style.display = "none";
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  });
});
