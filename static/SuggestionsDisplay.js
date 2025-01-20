/**
 * Displays suggestions and upgraded post text with an animation effect.
 * @param {string} suggestedPostText - The suggestions in JSON string format.
 */
export function displaySuggestionEffectively(suggestedPostText) {
    try {
      const parsedData = JSON.parse(suggestedPostText);
      animateSuggestions(parsedData.suggestions || []);
      animateUpgradedPost(parsedData.suggestedText || "");
    } catch (error) {
      console.error("Error in displaySuggestionEffectively:", error);
    }
  }
  
  /**
   * Sets placeholder values while real-time updates are being fetched.
   */
  export function setPlaceholderValues() {
    document.getElementById('positivity').textContent = "...";
    document.getElementById('likesCount').textContent = "...";
    document.getElementById('sentiment').textContent = "...";
    document.getElementById('emotionScore').textContent = "...";
    document.getElementById('toxicityScore').textContent = "...";
  }
  
  /**
   * Animates the display of suggestions character by character.
   * @param {Array<string>} suggestions - List of suggestions.
   */
  function animateSuggestions(suggestions) {
    const suggestionElement = document.getElementById('suggested_post_idea');
    suggestionElement.textContent = "";
  
    let suggestionIndex = 0;
    let charIndex = 0;
  
    function typeNextChar() {
      if (suggestionIndex < suggestions.length) {
        if (charIndex === 0) {
          suggestionElement.innerHTML += `${suggestionIndex + 1}. `;
        }
  
        if (charIndex < suggestions[suggestionIndex].length) {
          suggestionElement.innerHTML += suggestions[suggestionIndex][charIndex];
          charIndex++;
          setTimeout(typeNextChar, 50); // Delay between characters
        } else {
          suggestionElement.innerHTML += '<br>';
          charIndex = 0;
          suggestionIndex++;
          setTimeout(typeNextChar, 500); // Delay between suggestions
        }
      }
    }
  
    typeNextChar();
  }
  
  /**
   * Animates the display of the upgraded post text character by character.
   * @param {string} upgradedText - The upgraded post text.
   */
  function animateUpgradedPost(upgradedText) {
    const upgradedPostElement = document.getElementById('upgraded_post');
    upgradedPostElement.textContent = "";
  
    let charIndex = 0;
  
    function typeNextChar() {
      if (charIndex < upgradedText.length) {
        upgradedPostElement.textContent += upgradedText[charIndex];
        charIndex++;
        setTimeout(typeNextChar, 50); // Delay between characters
      }
    }
  
    typeNextChar();
  }
  