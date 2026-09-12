import google.generativeai as ai
import os 
import json

ai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = ai.GenerativeModel('gemini-3.6-flash')

def generate_flashcards(text):
    prompt = f"""
    Generate 5 flashcards from the following text. 
    REturn ONLY a JSON array, no explanation, no markdown, just raw JSON.
    Format:
    [
        {{"question" : "...", "answer" : "..."}},
        ...
    ]
    
    Text: {text}
    """
    response = model.generate_content(prompt)
    return json.loads(response.text)

def generate_quiz(text):
    prompt = f"""
    Generate 5 multiple choice quiz questions from the following text.
    Return ONLY a JSON array, no explanation, no markdown, just raw JSON.
    Format:
    [
        {{
            "question" : "...",
            "choices" : ["A. ...", "B. ...", "C. ...", "D. ..."],
            "correct_answer" : "A. ...",
            "explanation" : "..."
        }}
        ...
    ]
    
    Text: {text}
    """  
    response = model.generate_content(prompt)
    return json.loads(response.text)