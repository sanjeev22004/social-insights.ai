import { getInputValue, validateFormInputs } from './InputHandler.js';
import { sendAnalyzeRequest, handleRequestError } from './APIHandler.js';
import { processAnalysisResponse } from './UIUpdater.js';

// Main Event Listener for Form Submission
document.getElementById('analyzeForm').addEventListener('submit', handleFormSubmit);

/**
 * Handles form submission.
 */
async function handleFormSubmit(event) {
  event.preventDefault();


  const resultSection = document.querySelector(".result");

  resultSection.classList.remove("d-none"); // Remove 

  const username = getInputValue('username');
  const postText = getInputValue('post');

  if (!validateFormInputs(username, postText)) {
    alert("Please fill in both username and post fields.");
    return;
  }

  try {
    const analysisData = await sendAnalyzeRequest(username, postText);
    processAnalysisResponse(analysisData);
  } catch (error) {
    handleRequestError(error);
  }
}
