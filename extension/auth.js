import process from "./config.js";

// Ensure script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Handle errors from URL parameters
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  if (error) {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.style.display = "block";
      errorMessage.textContent = decodeURIComponent(error);
    }
  }

  // Signup Logic
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.getElementById("error-message");
      const successMessage = document.getElementById("success-message");

      try {
        const response = await fetch(`${process.BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          successMessage.style.display = "block";
          successMessage.textContent = "Signup successful! Redirecting...";
          setTimeout(() => {
            window.location.href = "login.html"; // Redirect to login page
          }, 1500);
        } else {
          errorMessage.style.display = "block";
          errorMessage.textContent = data.message;
        }
      } catch (error) {
        console.error("Signup failed", error);
        errorMessage.style.display = "block";
        errorMessage.textContent = "An error occurred. Please try again.";
      }
    });
  }

  // Login Logic
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.getElementById("error-message");

      try {
        const response = await fetch(`${process.BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          chrome.storage.local.set(
            {
              user: data.userObj,
              session: data.session,
              SScache: true, // Mark session as active
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
        errorMessage.textContent = "An error occurred. Please try again.";
      }
    });
  }
});
