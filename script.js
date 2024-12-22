document.addEventListener("DOMContentLoaded", () => {
  // Form reset
  const form = document.getElementById("eligibility-form");
  if (form) {
    form.reset();
  }

  // Retrieve answers from localStorage
  const answers = JSON.parse(localStorage.getItem("eligibilityAnswers"));
  
  let totalQuestions = 0;
  let positiveAnswers = 0;
  
  if (answers) {
    for (const key in answers) {
      totalQuestions++;
      if (answers[key].toLowerCase() === "yes") {
        positiveAnswers++;
      }
    }
  }

  const eligibilityPercentage = Math.round((positiveAnswers / totalQuestions) * 100);
  const resultPercentage = document.getElementById("result-percentage");
  const resultMessage = document.getElementById("result-message");

  // Show eligibility results
  if (resultPercentage) {
    resultPercentage.textContent = `${eligibilityPercentage}% Eligible`;
  }

  // Show message based on eligibility
  if (resultMessage) {
    resultMessage.textContent = eligibilityPercentage === 100
      ? "Congratulations! You meet all the requirements."
      : eligibilityPercentage >= 50
      ? "You meet some of the requirements. Consider improving further."
      : "Unfortunately, you do not meet the eligibility criteria. Want to try again?";
  }

  // Update progress bar
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = `${eligibilityPercentage}%`;
  }

  // Sharing buttons setup
  const resultMessageText = resultMessage.textContent;
  const shareButtonTwitter = document.getElementById("share-button-twitter");
  const shareButtonFacebook = document.getElementById("share-button-facebook");
  const shareButtonWhatsapp = document.getElementById("share-button-whatsapp");
  const shareButtonLinkedin = document.getElementById("share-button-linkedin");

  const baseURL = window.location.origin + window.location.pathname;
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(resultMessageText + " Check your eligibility at my website!")} ${baseURL}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseURL)}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(resultMessageText + " Check your eligibility at my website!")} ${baseURL}`;
  const linkedinURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseURL)}`;

  if (shareButtonTwitter) {
    shareButtonTwitter.href = twitterURL;
  }
  if (shareButtonFacebook) {
    shareButtonFacebook.href = facebookURL;
  }
  if (shareButtonWhatsapp) {
    shareButtonWhatsapp.href = whatsappURL;
  }
  if (shareButtonLinkedin) {
    shareButtonLinkedin.href = linkedinURL;
  }

  // Theme toggle functionality
  const toggleThemeButton = document.getElementById("toggle-theme");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    body.classList.add(savedTheme);
  }

  toggleThemeButton.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode");
    }
  });

  // Form submit handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();  // Prevent the form from submitting traditionally
    
    // Get form data
    const formData = new FormData(form);
    const answers = {};

    formData.forEach((value, key) => {
      answers[key] = value;
    });

    // Store the answers in localStorage
    localStorage.setItem("eligibilityAnswers", JSON.stringify(answers));

    // Redirect to the results page
    window.location.href = "/results.html";
  });
});
