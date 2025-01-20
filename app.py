import json
from flask import Flask, request, jsonify, render_template, Response
from threading import Thread
from time import sleep
from models.geminai import suggested_post
from models.like_prediction import engagement_predict
from models.sentiment import analyze_text

app = Flask(__name__)

# Store results temporarily for simplicity
results_store = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze_post', methods=['POST'])
def analyze_post():
    # Parse JSON data
    data = request.get_json()
    if not data or not data.get('username') or not data.get('post_text'):
        return jsonify({"error": "Username and post text are required"}), 400

    username = data['username']
    post_text = data['post_text']

    # Generate tips for the post
    tips = suggested_post(post_text)
    # Create a unique task ID
    task_id = username  # You can use a combination of username and timestamp for uniqueness
    results_store[task_id] = {
        "post_text_tips": tips,
        "sentiment": None,
        "predicted_likes": None
    }

    # Background computation for sentiment and predicted likes
    def calculate_likes():
        likes = engagement_predict(username)
        results_store[task_id]["predicted_likes"] = likes

    def text_sentiment_analysis():
        sentiment_result = analyze_text(post_text)  # Assuming this returns a JSON object
        results_store[task_id]["sentiment"] = sentiment_result

    # Start threads for background tasks
    Thread(target=calculate_likes).start()
    Thread(target=text_sentiment_analysis).start()

    # Send initial response with task ID
    return jsonify({
        "task_id": task_id,
        "post_text_tips": tips
    })

@app.route('/stream_updates/<task_id>')
def stream_updates(task_id):
    def event_stream():
        while True:
            task_result = results_store.get(task_id, {})
            if not task_result:
                yield f"data: {{\"error\": \"Task not found\"}}\n\n"
                break

            # Send updates for sentiment and likes as they are completed
            if task_result.get("sentiment") is not None:
                sentiment = task_result["sentiment"]
                # Directly send the sentiment data without jsonify
                yield f"data: {json.dumps(task_result['sentiment'])}\n\n"
                task_result["sentiment"] = None  # Clear after sending
             
                         # In the stream_updates route:

            if task_result.get("predicted_likes") is not None:
                # Manually serialize predicted_likes dictionary to JSON
                yield f"data: {json.dumps({'predicted_likes': task_result['predicted_likes']})}\n\n"
                task_result["predicted_likes"] = None  # Clear after sending

            sleep(2)  # Check every second

    return Response(event_stream(), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)