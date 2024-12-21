document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const app = document.getElementById("app");
  const form = document.getElementById("questions-form");
  const resultsSection = document.getElementById("results-section");
  const scoreSpan = document.getElementById("score");


  // Form submission logic
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let score = 0;

    // Gather all answers and calculate score
    const formData = new FormData(form);
    for (let value of formData.values()) {
      score += parseInt(value, 10);
    }

    const percentage = (score / 15) * 100;
    scoreSpan.textContent = Math.round(percentage);

    // Show results section
    form.classList.add("hidden");
    resultsSection.classList.remove("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questions-form");
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container";

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    
    // Show "NOT ELIGIBLE"
    resultContainer.textContent = "NOT ELIGIBLE";
    document.body.appendChild(resultContainer);

    // Wait for 2 seconds, then show results
    setTimeout(() => {
      resultContainer.textContent = "Scroll down to check your eligibility!";
      resultContainer.classList.add("scroll-indicator");
    }, 2000);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questions-form");
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container";
  document.body.appendChild(resultContainer);

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload


document.addEventListener("DOMContentLoaded", () => {
  const resultContainer = document.getElementById("result-container");

  // Show "NOT ELIGIBLE" first
  resultContainer.textContent = "NOT ELIGIBLE";
  resultContainer.classList.add("show");

  // After 2 seconds, update the message
  setTimeout(() => {
    resultContainer.textContent = "Scroll down to check your eligibility!";
  }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
  const resultContainer = document.getElementById("result-container");

  // Display initial message
  resultContainer.textContent = "NOT ELIGIBLE";
  resultContainer.classList.add("show");

  // Change message after a delay
  setTimeout(() => {
    resultContainer.textContent = "Scroll down to check your eligibility!";
    resultContainer.classList.add("scroll-indicator");
  }, 2000);
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questions-form");
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container";
  document.body.appendChild(resultContainer);

  const eligibilityInfo = document.getElementById("eligibility-info");
  const percentageSpan = document.getElementById("percentage");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    // Show "NOT ELIGIBLE"
    resultContainer.textContent = "NOT ELIGIBLE";
    resultContainer.classList.add("scroll-indicator");

    // After 2 seconds, show "Scroll down to check eligibility"
    setTimeout(() => {
      resultContainer.textContent = "Scroll down to check your eligibility!";
    }, 2000);

    // Calculate eligibility percentage
    const formData = new FormData(form);
    let score = 0;
    let totalQuestions = 0;

    // Calculate score based on answers (1 for Yes, 0 for No)
    for (let value of formData.values()) {
      score += parseInt(value, 10);
      totalQuestions++;
    }

    // Calculate eligibility percentage
    const percentage = (score / totalQuestions) * 100;

    // Wait for user to scroll down
    window.addEventListener("scroll", () => {
      eligibilityInfo.style.display = "block";
      percentageSpan.textContent = Math.round(percentage);
    });
  });
});