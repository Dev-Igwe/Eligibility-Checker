document.addEventListener("DOMContentLoaded", () => {
  // Select the form and reset it if it exists
  const form = document.getElementById("eligibility-form");
  if (form) {
    form.reset();
  }

  // Calculate eligibility percentage
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const questions = urlParams.entries();

  let totalQuestions = 0;
  let positiveAnswers = 0;

  for (const [key, value] of questions) {
    totalQuestions++;
    if (value.toLowerCase() === "yes") {
      positiveAnswers++;
    }
  }

  const eligibilityPercentage = Math.round((positiveAnswers / totalQuestions) * 100);
  const resultPercentage = document.getElementById("result-percentage");
  const resultMessage = document.getElementById("result-message");

  if (resultPercentage) {
    resultPercentage.textContent = "0% Eligible";
  }
  if (resultMessage) {
    resultMessage.textContent = "You're not eligible.";
  }

  // Show the actual results after a delay
  setTimeout(() => {
    if (resultPercentage) {
      resultPercentage.textContent = `${eligibilityPercentage}% Eligible`;
    }

    const isValentine = document.body.classList.contains("valentine");
    const isChristmas = document.body.classList.contains("christmas");

    if (isValentine || isChristmas) {
      if (eligibilityPercentage === 100) {
        resultMessage.textContent = "Yay! You're getting gifts!";
      } else if (eligibilityPercentage >= 50) {
        resultMessage.textContent = "You meet some of the requirements. You might still get something!";
      } else {
        resultMessage.textContent = "No gift for you enugbe!";
      }
    } else {
      if (eligibilityPercentage === 100) {
        resultMessage.textContent = "Congratulations! You meet all the requirements.";
      } else if (eligibilityPercentage >= 50) {
        resultMessage.textContent = "You meet some of the requirements. Consider improving further.";
      } else {
        resultMessage.textContent = "Unfortunately, you do not meet the eligibility criteria. Want to try again?";
      }
    }

    // Update the progress bar width
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = `${eligibilityPercentage}%`;
    }

  }, 2000); // 2-second delay

  // Countdown Timer Logic
  const countdown = document.getElementById("countdown");
  function updateCountdown(eventDate) {
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff <= 0) {
      countdown.textContent = "The event is here!";
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Determine the event date based on the page
  let eventDate;
  if (document.body.classList.contains("christmas")) {
    eventDate = new Date("2024-12-25T00:00:00"); // Christmas
  } else if (document.body.classList.contains("eligibility-2025")) {
    eventDate = new Date("2025-01-01T00:00:00"); // New Year's
  } else if (document.body.classList.contains("valentine")) {
    eventDate = new Date("2025-02-14T00:00:00"); // Valentine's Day
  }

  if (eventDate) {
    setInterval(() => {
      updateCountdown(eventDate);
    }, 1000);
  }

  // Reload on pageshow to fix form retention issues
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      window.location.reload();
    }
  });

  // Handle sharing functionality
  const shareButtonTwitter = document.getElementById("share-button-twitter");
  const shareButtonFacebook = document.getElementById("share-button-facebook");
  const shareButtonWhatsapp = document.getElementById("share-button-whatsapp");
  const shareButtonLinkedin = document.getElementById("share-button-linkedin");

  const baseURL = window.location.origin + window.location.pathname;
  const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(resultMessage + " Check your eligibility at my website!")} ${baseURL}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseURL)}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(resultMessage + " Check your eligibility at my website!")} ${baseURL}`;
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
});
