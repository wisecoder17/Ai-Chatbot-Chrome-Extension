import process from "./config.js";
import { sendQuery } from "./utils/api.js";

// Check if user is logged in by checking chrome.storage
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
      document.getElementById("response").innerText = `Welcome back, ${user.username}!`;
    }
  });
});

// Logout Function
document.getElementById("logout-button").addEventListener("click", async () => {
  chrome.storage.local.get("session", async (result) => {
    const session = result.session;
    
    if (session && session.sessionId) {
      try {
        const response = await fetch(`http://${process.BASE_URL}/api/auth/logout`, {
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


document.getElementById("send-button").addEventListener("click", async () => {
  const query = document.getElementById("query").value;
  const responseElement = document.getElementById("response");
  const loadingElement = document.getElementById("loading");

  responseElement.innerText = "";
  loadingElement.style.display = "block";

  try {
    const data = await sendQuery(query);
    responseElement.innerText = data.response;
  } catch (error) {
    responseElement.innerText = "Error: " + error.message;
  } finally {
    loadingElement.style.display = "none";
  }
});