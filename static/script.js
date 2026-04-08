function sendMessage() {
    let inputField = document.getElementById("msg");
    let message = inputField.value.trim();

    if (message === "") return;

    addMessage(message, "user");
    inputField.value = "";

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.reply, "bot");
    })
    .catch(error => {
        addMessage("⚠️ Error connecting to server", "bot");
        console.error(error);
    });
}

function addMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}