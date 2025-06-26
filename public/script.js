document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("auth-form");
  const toggleLink = document.getElementById("toggle-link");
  const formTitle = document.getElementById("form-title");
  const submitBtn = document.getElementById("submit-btn");

  let isLogin = true;

  if (toggleLink) {
    toggleLink.addEventListener("click", (e) => {
      e.preventDefault();
      isLogin = !isLogin;
      formTitle.textContent = isLogin ? "Login" : "Register";
      submitBtn.textContent = isLogin ? "Login" : "Register";
      toggleLink.textContent = isLogin ? "Register" : "Login";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const endpoint = isLogin ? "/login" : "/signup";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        if (isLogin) {
          window.location.href = "mood.html";
        } else {
          alert("✅ Registered! Now you can log in.");
          isLogin = true;
          formTitle.textContent = "Login";
          submitBtn.textContent = "Login";
          toggleLink.textContent = "Register";
        }
      } else {
        alert(data.message || "Something went wrong.");
      }
    });
  }
});

async function generateQuote() {
  const mood = document.getElementById("mood").value;
  const quoteBox = document.getElementById("quoteBox");

  if (!mood) {
    quoteBox.innerText = "Please select your mood.";
    return;
  }

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood }),
  });

  const data = await response.json();
  quoteBox.innerText = `"${data.quote}"`;
}
