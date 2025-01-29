/**
 * Fetches trimmed value from an input element by its ID.
 * @param {string} elementId - The ID of the input element.
 * @returns {string} - The trimmed input value.
 */
export function getInputValue(elementId) {
    return document.getElementById(elementId).value.trim();
  }
  
  /**
   * Validates that required inputs are provided.
   * @param {string} username - Username input.
   * @param {string} postText - Post text input.
   * @returns {boolean} - True if inputs are valid, false otherwise.
   */
export function validateFormInputs(username, postText) {
    return username && postText;
  }
  