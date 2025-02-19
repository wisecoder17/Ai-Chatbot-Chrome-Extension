document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        successMessage.style.display = "block";
        successMessage.textContent = "Signup successful! Please log in.";
        window.location.href = "login.html"; // Redirect to login page
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
  