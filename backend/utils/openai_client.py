from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

print("ENV:", os.getenv("OPENAI_API_KEY"))

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)