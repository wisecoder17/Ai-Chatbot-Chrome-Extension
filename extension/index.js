// Check if user is logged in by checking localStorage
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If no user found in localStorage, redirect to login page
    window.location.href = "login.html";
  } else {
    // If user is logged in, show the main content
    document.getElementById("response").innerText = `Welcome back, ${user.username}!`;
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