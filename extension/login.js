import process from "./config.js";

// Handle errors from URL parameters
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  if (error) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
    errorMessage.textContent = decodeURIComponent(error);
  }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  try {
    const response = await fetch(`${process.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();
    // console.log(data);

    if (response.ok) {
    chrome.storage.local.set(
      {
        user: data.userObj,
        session: data.session,
        SScache: true, // Mark that the session exists
      },
      () => {
        console.log("User session stored securely.");
        window.location.href = "index.html"; // Redirect to main page
      }
    );

    } else {
      errorMessage.style.display = "block";
      errorMessage.textContent = data.message;
    }
  } catch (error) {
    console.error("Login failed", error);
    errorMessage.style.display = "block";
    errorMessage.textContent = "An error occurred. Please try again!.";
  }
});
  