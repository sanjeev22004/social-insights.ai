import { startSentimentAndLikesUpdates } from './RealTimeUpdates.js';
import { displaySuggestionEffectively, setPlaceholderValues } from './SuggestionsDisplay.js';

/**
 * Processes the initial analysis response and starts real-time updates.
 * @param {Object} data - The analysis response data.
 */
export function processAnalysisResponse(data) {
  if (data) {
    updateInitialUI(data.post_text_tips);
    startSentimentAndLikesUpdates(data.task_id);
  }
}

/**
 * Updates the UI with initial data.
 * @param {string} suggestedText - Suggestions for improving the post.
 */
function updateInitialUI(suggestedText) {
  displaySuggestionEffectively(suggestedText);
  setPlaceholderValues();
}
