 document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document.getElementById("loginPassword").value;

      const storedUserRaw = localStorage.getItem("user");

      if (!storedUserRaw) {
        const proceed = confirm("No account found. Would you like to sign up now?");
        if (proceed) {
          window.location.href = "signup.html";
        }
        return;
      }

      const storedUser = JSON.parse(storedUserRaw);

      if (
        loginEmail.toLowerCase() === storedUser.email.toLowerCase() &&
        loginPassword === storedUser.password
      ) {
        alert("Login successful!");
        window.location.href = 'homepage.html'; // Redirect to  homepage
      } else {
        alert("Incorrect email or password.");
      }
    });