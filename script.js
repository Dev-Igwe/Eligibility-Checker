document.addEventListener("DOMContentLoaded", () => {
  // Select the form
  const form = document.getElementById("eligibility-form");

  // Clear form inputs if the form exists
  if (form) {
    form.reset();
  }

  // Existing logic for results page
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

  // Calculate eligibility percentage
  const eligibilityPercentage = Math.round((positiveAnswers / totalQuestions) * 100);

  const resultPercentage = document.getElementById("result-percentage");
  const resultMessage = document.getElementById("result-message");

  // Show temporary "Not Eligible" message
  if (resultPercentage) {
    resultPercentage.textContent = "0% Eligible";
  }
  if (resultMessage) {
    resultMessage.textContent = "You're not eligible.";
  }

  // After 2 seconds, show the actual results
  setTimeout(() => {
    if (resultPercentage) {
      resultPercentage.textContent = `${eligibilityPercentage}% Eligible`;
    }
    if (resultMessage) {
      if (eligibilityPercentage === 100) {
        resultMessage.textContent = "Congratulations! You meet all the requirements.";
      } else if (eligibilityPercentage >= 50) {
        resultMessage.textContent = "You meet some of the requirements. Consider improving further.";
      } else {
        resultMessage.textContent = "Unfortunately, you do not meet the eligibility criteria. Want to try again?";
      }
    }
  }, 2000); // 2-second delay
  window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Reload the page if it was loaded from the cache
    window.location.reload();
  }
});
});