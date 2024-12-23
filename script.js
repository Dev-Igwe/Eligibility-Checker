document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eligibility-form");
  const resultPercentage = document.getElementById("result-percentage");
  const resultMessage = document.getElementById("result-message");
  const progressBar = document.getElementById("progress-bar");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the page from refreshing when form is submitted
      console.log("Form submitted");  // Added to confirm submission

      // Get form data
      const formData = new FormData(form);
      const answers = {};

      formData.forEach((value, key) => {
        answers[key] = value; // Store answers as key-value pairs
      });

      // Store the answers in localStorage
      localStorage.setItem("eligibilityAnswers", JSON.stringify(answers));

      // Display eligibility results
      displayEligibilityResults(answers);
    });
  } else {
    console.log("Form element not found!"); // Added to debug if the form is not found
  }

  // Function to display eligibility results
  function displayEligibilityResults(answers) {
    let totalQuestions = 0;
    let positiveAnswers = 0;

    for (const key in answers) {
      totalQuestions++;
      if (answers[key].toLowerCase() === "yes") {
        positiveAnswers++;
      }
    }

    const eligibilityPercentage = Math.round((positiveAnswers / totalQuestions) * 100);

    // Safely update result elements
    if (resultPercentage) {
      resultPercentage.textContent = `${eligibilityPercentage}% Eligible`;
    } else {
      console.log("result-percentage element not found!");
    }

    if (resultMessage) {
      // Check if it's Valentine or Christmas and display custom messages
      const isValentine = document.body.classList.contains("valentine");
      const isChristmas = document.body.classList.contains("christmas");

      if (isValentine || isChristmas) {
        resultMessage.textContent =
          eligibilityPercentage === 100
            ? "Yay! You're getting gifts!"
            : eligibilityPercentage >= 50
            ? "You meet some of the requirements. You might still get something!"
            : "No gift for you enugbe!";
      } else {
        resultMessage.textContent =
          eligibilityPercentage === 100
            ? "Congratulations! You meet all the requirements."
            : eligibilityPercentage >= 50
            ? "You meet some of the requirements. Consider improving further."
            : "Unfortunately, you do not meet the eligibility criteria. Want to try again?";
      }
    } else {
      console.log("result-message element not found!");
    }

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${eligibilityPercentage}%`;
    } else {
      console.log("progress-bar element not found!");
    }
  }

  // Countdown Timer Logic (Optional if not needed)
  const countdown = document.getElementById("countdown");
  function updateCountdown(eventDate) {
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff <= 0) {
      countdown.textContent = "The event is here!";
      return; // Stop further updates
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

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
    }, 1000); // Update every second
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

  // Sharing buttons setup
  const resultMessageText = document.getElementById("result-message")?.textContent;
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
});