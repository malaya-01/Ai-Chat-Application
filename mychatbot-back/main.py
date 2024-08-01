# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, ChatHistory
import requests

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your React app's URL
    # allow_origins=["*"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app = FastAPI()

# MySQL database connection
DATABASE_URL = "mysql+pymysql://root:cybrain12345@127.0.0.1:3306/mydemo_bot"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

# API endpoint model
class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
def chat(request: ChatRequest):
    session = SessionLocal()
    try:
        # Prepare the chat history
        chat_history = session.query(ChatHistory).all()
        history_prompt = "\n".join([f"User: {chat.user_input}\nModel: {chat.model_response}" for chat in chat_history])
        history_prompt += f"\nUser: {request.prompt}"

        # API call to external model
        url = "http://localhost:11434/api/generate"
        payload = {
            "model": "llama3.1",
            "prompt": history_prompt,
            "stream": False,
            "options": {
                "temperature": 1
            }
        }

        response = requests.post(url, json=payload)
        response.raise_for_status()

        try:
            json_response = response.json()
            response_text = json_response.get("response", "No response field found")

            # Save chat history to the database
            chat_entry = ChatHistory(user_input=request.prompt, model_response=response_text)
            session.add(chat_entry)
            session.commit()

            return {"response": response_text}
        except requests.exceptions.JSONDecodeError:
            raise HTTPException(status_code=500, detail="Invalid JSON response from model API")
    except requests.ConnectionError:
        raise HTTPException(status_code=500, detail="Unable to connect to the server")
    finally:
        session.close()

@app.get("/history")
def get_history():
    session = SessionLocal()
    try:
        chat_history = session.query(ChatHistory).all()
        return [{"user_input": chat.user_input, "model_response": chat.model_response} for chat in chat_history]
    finally:
        session.close()
