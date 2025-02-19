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
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        // Successful login, store in localStorage
        localStorage.setItem("user", JSON.stringify(data.userObj));
        localStorage.setItem("session", JSON.stringify(data.session));
        window.location.href = "index.html"; // Redirect to main page
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
  