from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# 🔑 Put your API key here
myKey = "AIzaSyAHjYz17wHXAqHYEvnDI6upIcUFnu0Thfs"

genai.configure(api_key=myKey)

model = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json["message"]

    try:
        response = model.generate_content(user_msg)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

    