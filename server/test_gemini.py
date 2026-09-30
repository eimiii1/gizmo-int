from google import genai 
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

chat = client.chats.create(model='gemini-3.8-flash')
response = chat.send_message('Say hello in a friendly way.')

print(response.text)