// Check if user is logged in by checking localStorage
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const session = JSON.parse(localStorage.getItem("session"));


  if (!user || !session || Date.now() > session.sessionExpiration) {
    // Check if the app has been opened before
    if (localStorage.getItem("SScache")) {
        // If session expired, show error
        window.location.href = "login.html?error=Session expired. Please log in.";
    } else {
        // First timer don't show error
        window.location.href = "login.html";
    }

    // Remove user and session data
    localStorage.removeItem("user");
    localStorage.removeItem("session");
  } else {
    // If user is logged in, show the index page
    document.getElementById("response").innerText = `Welcome back, ${user.username}!`;
  }
});

// Logout Function
document.getElementById("logout-button").addEventListener("click", async () => {
  const session = JSON.parse(localStorage.getItem("session")); // Get session from localStorage
  if (session && session.sessionId) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sessionId: session.sessionId }), // Send sessionId to backend
      });

      if (response.ok) {
        // Clear localStorage after successful logout
        localStorage.removeItem("session");
        localStorage.removeItem("user");
        localStorage.removeItem("SScache");
        console.log("Logged out successfully");
        window.location.href = "login.html"; // Redirect after logout
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  } else {
    console.error("No session found in localStorage");
    window.location.href = "login.html"; // Redirect after logout
  }
});




import { sendQuery } from "./utils/api.js";

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