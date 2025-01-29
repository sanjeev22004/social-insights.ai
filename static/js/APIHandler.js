/**
 * Sends an analysis request to the server.
 * @param {string} username - The username of the user.
 * @param {string} postText - The text of the post.
 * @returns {Promise<Object>} - The server response.
 */
export async function sendAnalyzeRequest(username, postText) {
    try {
      const response = await fetch('/analyze_post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, post_text: postText }),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze the post.');
      }
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Handles errors during API requests.
   * @param {Error} error - The error object.
   */
  export function handleRequestError(error) {
    console.error('Error:', error);
    alert('An error occurred while processing your request. Please try again.');
  }
  