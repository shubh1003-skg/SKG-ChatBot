async function sendMessage() {
    let input = document.getElementById("msg");
    let msg = input.value;

    if (!msg) return;

    addMessage(msg, "user");
    input.value = "";

    // 👇 Show loader
    let loaderId = addLoader();

    let response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: msg })
    });

    let data = await response.json();

    // ❌ Remove loader
    removeLoader(loaderId);

    // ✅ Show bot reply
    addMessage(data.response, "bot");
}

function addMessage(text, type) {
    let chatBox = document.getElementById("chat-box");

    let div = document.createElement("div");
    div.classList.add("message", type);
    div.innerText = text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 🔥 Loader functions
function addLoader() {
    let chatBox = document.getElementById("chat-box");

    let div = document.createElement("div");
    div.classList.add("message", "bot");

    let loader = document.createElement("div");
    loader.classList.add("loader");

    loader.innerHTML = "<span></span><span></span><span></span>";

    div.appendChild(loader);
    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}

function removeLoader(loaderDiv) {
    loaderDiv.remove();
}

// Enter key support
document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});