// // Check if user is logged in by checking localStorage
// window.addEventListener("DOMContentLoaded", () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     // If no user found in localStorage, redirect to login page
//     window.location.href = "login.html";
//   } else {
//     // If user is logged in, show the index page
//     document.getElementById("response").innerText = `Welcome back, ${user.username}!`;
//   }
// });


// Function to get cookie value by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

// Check if session exists
window.addEventListener("DOMContentLoaded", async () => {
  const sessionId = getCookie("sessionId");

  if (!sessionId) {
    window.location.href = "login.html"; // Redirect to login page if no session
    return;
  }

  document.getElementById("response").innerText = `Welcome back!`;
});

// Logout Function
document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "login.html"; // Redirect after logout
  } catch (error) {
    console.error("Logout failed", error);
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