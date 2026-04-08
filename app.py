
from flask import Flask, render_template, request, jsonify
import os
from google import genai

app = Flask(__name__)

client = genai.Client(api_key=os.getenv("API_KEY"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=user_input
    )

    return jsonify({"reply": response.text})