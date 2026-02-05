const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const container = document.querySelector(".buttons");

/* ================= STATE ================= */
let escapeCount = 0;

const teaseMessages = [
    "Nice try 😏",
    "Almost clicked 😜",
    "Too slow 😝",
    "You can't say no 💕",
    "Just press YES 😍"
];

/* ================= UTIL ================= */
function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
}

function playPopSound() {
    const audio = new Audio(
        "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
    );
    audio.play().catch(() => {});
}

/* ================= MOVE LOGIC ================= */
function moveNoButton() {
    escapeCount++;

    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    // SPEED SCALING (distance increases)
    const intensity = Math.min(escapeCount * 0.15, 1);

    const x = Math.random() * maxX * intensity;
    const y = Math.random() * maxY * intensity;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Teasing text
    result.textContent =
        teaseMessages[Math.min(escapeCount - 1, teaseMessages.length - 1)];

    vibrate();
    playPopSound();
}

/* ================= DESKTOP ================= */
noBtn.addEventListener("mouseenter", moveNoButton);

/* ================= MOBILE ================= */
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});

/* ================= CONFETTI + HEARTS ================= */
function celebrate() {
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.textContent = "💖";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "50%";
        heart.style.fontSize = "24px";
        heart.style.animation = "floatUp 2s ease-out forwards";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }
}

/* ================= YES LOGIC ================= */
yesBtn.addEventListener("click", () => {
    result.textContent = "Yayyy! 💕 I knew it 😍";
    noBtn.style.display = "none";
    yesBtn.disabled = true;

    vibrate();
    celebrate();
});
