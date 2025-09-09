// Define an empty array for handling user messages
let messages = [];

// Function to display messages in the chat window
function displayMessages() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = ''; // Clear the previous messages
    messages.forEach((msg, i) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        if (i % 2 === 0) {
            messageElement.classList.add('my-message');
        } else {
            messageElement.classList.add('ai-message');
        }
        messageElement.textContent = msg.text;
        chatWindow.appendChild(messageElement);
    });
}

//ChatBot Response besic
const responses = [
    {
        keywords: ["halo", "hallo", "halo?", "hallo?"],
        reply: "Halo juga! Senang bisa ngobrol denganmu 😊, Apa ada yang bisa saya bantu?"
    },
    {
        keywords: ["hai", "hai?"],
        reply: "Hai juga! Senang bisa ngobrol denganmu 😊, Apa ada yang bisa saya bantu?"
    },
    {
        keywords: ["siapa kamu", "kamu siapa", "nama kamu", "siapa kamu?", "kamu siapa?", "nama kamu?", "siapa saya", "saya siapa", "nama saya", "siapa saya?", "saya siapa?", "nama saya?"],
        reply: "Aku chatbot sederhana buatan Muhammad Ramdan untuk portofolio."
    },
    {
        keywords: ["siapa ramdan", "ramdan siapa", "siapa ramdan?", "ramdan siapa?"],
        reply: "Ramdan adalah seorang mahasiswa semester 2 di jurusan Teknik Informatika"
    },
    {
        keywords: ["apa hobi dia", "apa hobi ramdan", "ramdan sobinya apa", "apa hobi dia?", "apa hobi ramdan?", "ramdan sobinya apa?"],
        reply: "Hobi Ramdan adalah belajar coding, seperti mencoba framework yang belum dia coba atau membuat project sederhana seperti kalkulator, ramdan juga hobi joging, atau bermain game survival"
    },
    {
        keywords: ["skill", "keahlian", "kemampuan"],
        reply: "Skill pemilikku: Dasar HTML, CSS, JavaScript, PHP, C++, Godot 👨‍💻."
    },
    {
        keywords: ["project", "proyek", "portfolio"],
        reply: "Kamu bisa lihat project di bagian *My Projects* ya!"
    },
    {
        keywords: ["thanks", "terima kasih", "makasih"],
        reply: "Sama-sama! Senang bisa membantu 🙏"
    }
];

function getBotResponse(input) {
    input = input.toLowerCase();

    // Special case
    if (input.includes("tes") || input.includes("test")) {
        return "Oke, chatbot aktif ✅";
    }

    // Dictionary lookup
    for (const res of responses) {
        if (res.keywords.some(keyword => input.includes(keyword))) {
            return res.reply;
        }
    }

    return "Hmm... aku belum mengerti maksudmu 😅";
}

// Function to handle sending messages
function sendMessage() {
    // Get input from the user
    const input = document.getElementById('chat-input').value.trim();
    if (input === '') {
        alert('Please enter a message.');
        return;
    }
    messages.push({ text: input, sender: 'user' });
    displayMessages(); // Update chat window

    document.getElementById('chat-input').value = '';

    // Basic AI response
    // Dapatkan respon dari bot (pakai fungsi getBotResponse)
    setTimeout(() => {
        const aiResponse = getBotResponse(input);
        messages.push({ text: aiResponse, sender: 'ai' });
        displayMessages();
    }, 800); // kasih delay biar kesannya bot lagi "ngetik"

}

// Handling submit button click
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Handle enter key press for sending messages when focusing on the input field
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotBox = document.getElementById('chatbot-box');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');

    chatbotIcon.addEventListener('click', () => {
        chatbotBox.classList.toggle('active');
        chatInput.focus();
    });

    closeChat.addEventListener('click', () => chatbotBox.classList.remove('active'));
});


//Post Email
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const timeInput = document.getElementById("form-time");

    // ambil elemen status
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const sentMessage = document.querySelector(".sent-message");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // reset status dulu
            loading.style.display = "block";
            errorMessage.style.display = "none";
            sentMessage.style.display = "none";

            // isi waktu otomatis
            const now = new Date();
            timeInput.value = now.toLocaleString();

            // kirim via EmailJS
            emailjs.sendForm("service_3cl48w9", "template_kwkblif", this, "r67scWZGy-TceO-Yd")
                .then(() => {
                    loading.style.display = "none";
                    sentMessage.style.display = "block";
                    form.reset();
                }, (error) => {
                    loading.style.display = "none";
                    errorMessage.style.display = "block";
                    errorMessage.innerText = "❌ Gagal mengirim pesan: " + error.text;
                });
        });
    }
});
