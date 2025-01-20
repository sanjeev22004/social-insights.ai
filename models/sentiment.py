from transformers import pipeline
from textblob import TextBlob

# Initialize emotion classifier pipeline using a pretrained model
emotion_classifier = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")

# Initialize toxicity classifier pipeline using a pretrained model
classifier = pipeline("text-classification", model="unitary/toxic-bert")



def analyze_text(text):
    """
    Perform a comprehensive analysis on the input text.
    :param text: Input text
    :return: Dictionary containing emotions, toxicity, and sentiment analysis results
    """
    emotions = detect_emotion(text)
    toxicity = detect_toxicity(text)
    sentiment = polarity(text)
    return {
        
        "emotions": emotions,
        "toxicity": toxicity,
        "sentiment": sentiment
    }

# sample response => 
# {'emotions': {'sadness': 88.51}, 'toxicity': {'toxic': 96.98}, 
# 'sentiment': {'polarity': 0.0, 'subjectivity': 100.0}}






# Function to convert a value in a specific range to a percentage
def range_to_percentage(start, end, value):
    """
    Convert a value in a range to a percentage (0-100%).
    :param start: Starting value of the range
    :param end: Ending value of the range
    :param value: Value to be converted
    :return: Percentage (0-100)
    """
    percentage = ((value - start) / (end - start)) * 100
    return round(percentage, 2)  # Round to 2 decimal places for readability

# Function to perform sentiment analysis using TextBlob
def polarity(post_text):
    """
    Perform sentiment analysis using TextBlob.
    :param post_text: Input text
    :return: Polarity and subjectivity as percentages
    """
    emotion = TextBlob(post_text)
    print(emotion.sentiment.polarity)
    polarity = range_to_percentage(-1, 1, emotion.sentiment.polarity)  # Convert polarity to percentage
    subjectivity = range_to_percentage(0, 1, emotion.sentiment.subjectivity)  # Convert subjectivity to percentage
    return {"positivity": polarity, "subjectivity": subjectivity}

# Function to detect emotions in text using the emotion classifier
def detect_emotion(text):
    """
    Detect emotions in the text using the emotion classifier.
    :param text: Input text
    :return: Dictionary of emotions with percentages
    """
    results = emotion_classifier(text)
    return {result['label']: range_to_percentage(0, 1, result['score']) for result in results}

# Function to detect toxicity in text using the toxicity classifier
def detect_toxicity(text):
    """
    Detect toxicity in the text using the toxicity classifier.
    :param text: Input text
    :return: Dictionary of toxicity labels with percentages
    """
    results = classifier(text)
    return {result['label']: range_to_percentage(0, 1, result['score']) for result in results}


# print(("You are the worst person ever!"))


