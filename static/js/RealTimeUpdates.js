/**
 * Handles real-time updates for sentiment and likes using server-sent events.
 * @param {string} taskId - The task ID for tracking updates.
 */
export function startSentimentAndLikesUpdates(taskId) {
    const eventSource = new EventSource(`/stream_updates/${taskId}`);
  
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateRealTimeUI(data);
  
      if (data.status === "Task completed") {
        eventSource.close();
      }
    };
  
    eventSource.onerror = (error) => {
      console.error("Error with EventSource:", error);
      eventSource.close();
    };
  }
  
  /**
   * Updates the UI with real-time data.
   * @param {Object} data - The real-time update data.
   */
  function updateRealTimeUI(data) {
    console.log(data)
    console.log(data.predicted_likes)
    if(data.predicted_likes !== undefined){
        document.getElementById('likesCount').textContent = `${data.predicted_likes || 'N/A' }`;
   
    }
    document.getElementById('positivity').textContent = `${data.sentiment.positivity }`;
    document.getElementById('sentiment').textContent = `${data.sentiment.subjectivity }`;
    document.getElementById('likesCount').textContent = `${data.predicted_likes || 'N/A' }`;

    console.log(data.predicted_likes)
    updateEmotionUI(data.emotions);
    updateToxicityUI(data.toxicity);
  
    
  }
  
  /**
   * Updates emotion-related UI components.
   * @param {Object} emotions - The emotion data.
   */
  function updateEmotionUI(emotions) {
    const emotionEntries = Object.entries(emotions);
    if (emotionEntries.length > 0) {
      const [firstEmotion, firstScore] = emotionEntries[0];
      document.getElementById('emotionScore').textContent = `${firstScore}`;
      document.getElementById('emotion').textContent = firstEmotion;
    } else {
      document.getElementById('emotionScore').textContent = 'N/A';
      document.getElementById('emotion').textContent = 'No emotion detected';
    }
  }
  
  /**
   * Updates toxicity-related UI components.
   * @param {Object} toxicity - The toxicity data.
   */
  function updateToxicityUI(toxicity) {
    const toxicityEntries = Object.entries(toxicity);
    if (toxicityEntries.length > 0) {
      const [firstToxType, firstToxScore] = toxicityEntries[0];
      document.getElementById('toxicityScore').textContent = `${firstToxScore}`;
      document.getElementById('toxicityType').textContent = firstToxType;
    } else {
      document.getElementById('toxicityScore').textContent = 'N/A';
      document.getElementById('toxicityType').textContent = 'No toxicity detected';
    }
  }


  