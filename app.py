from flask import Flask, render_template, request, jsonify
import os
from google import genai

app = Flask(__name__)

# Load API key from Render environment
client = genai.Client(api_key=os.getenv("API_KEY"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message")

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=user_input
        )

        return jsonify({"reply": response.text})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "⚠️ Error: " + str(e)})

if __name__ == "__main__":
    app.run(debug=True)