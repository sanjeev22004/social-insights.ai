import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

def suggested_post(data):
    # Configure the API key
    genai.configure(api_key=os.getenv("GENAI_API_KEY"))  # Replace with your actual API key
    
    # Define the prompt
    prompt = (
        "Analyze the engagement of the following post and provide the output in JSON format "
        "with the following fields:\n\n"
        
        "1. suggestions: Provide an array of suggestions to improve the post for better engagement.\n"
        "2. suggestedText: Create an improved version of the post under 280 characters while maintaining the original meaning. that should help in increasing engagement"
        "Ensure the length closely matches the original post.\n\n"
        "Ensure the response starts with '{' and ends with '}' as plain text. "
        "Do not include any additional text, explanations, or formatting.\n\n"
        "Here's the post:\n" + data
    )
    
    # Generate the response
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    
    # Return the generated text
    return response.text
