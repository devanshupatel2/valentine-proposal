// --- DOM Elements ---
const yesButton = document.getElementById("yesButton");
const yesContainer = document.getElementById("yesContainer");
const noButton = document.getElementById("noButton");
const mainGif = document.getElementById("mainGif");
const container = document.getElementById("container");
const modal = document.getElementById("messageModal");
const modalText = document.getElementById("modalText");
const closeModalBtn = document.getElementById("closeModalBtn");

// --- State Variables ---
let noCount = 0;
let yesSize = 1;
let heartIntervalTime = 300;
let heartTimer = null;

// Colors
let activeColors = ["#ff0000", "#ff69b4"];
const extraColors = ["#ffa500", "#800080", "#0000ff", "#008000"];

// --- Phrases & Messages ---
const petPhrases = [
  "Wait, UB, are you sure?",
  "Really sure, Cutu??",
  "Think again, Kuchipoo!",
  "Babe, don't do this to me...",
  "Surely not, Cutiepie?",
  "You're breaking my heart, UB ;(",
  "Is that your final answer, Babe?",
  "But Cutu, think of the treats!",
  "Stop clicking this, Cutiepie!",
  "UB, you're being so cold!",
  "Change of mind, Kuchipoo?",
  "You're making me cry, Babe...",
  "Just click Yes already, Cutu! ❤️",
];

const secretMessages = [
  "I promise to always buy you snacks 🍫",
  "You're 90% angel... And I'm very invested in the remaining 10% 🙈",
  "Always thought sexy started with S, but turns out it starts with U 😘",
  "I love the way you laugh ❤️",
  "Sun is bright, the stars are gold. Youv've got the finest view I hold 🌟",
  "Roses are red, violets are blue, I like you... And you boobies too 🌹",
  "You are my favorite notification 📱",
  "Thick thighs, pretty eyes, all I want is to call you mine 😍",
];

let availablePhrases = [...petPhrases];

// --- Functions ---

function getRandomPhrase() {
  if (availablePhrases.length === 0) {
    availablePhrases = [...petPhrases];
  }
  const randomIndex = Math.floor(Math.random() * availablePhrases.length);
  return availablePhrases.splice(randomIndex, 1)[0];
}

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "&#10084;";
  heart.classList.add("heart");

  const randomColor =
    activeColors[Math.floor(Math.random() * activeColors.length)];
  heart.style.color = randomColor;

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

function startHeartRain() {
  if (heartTimer) clearInterval(heartTimer);
  heartTimer = setInterval(createFloatingHeart, heartIntervalTime);
}

// Start immediately
startHeartRain();

// --- Modal Logic ---
function showMessage(text) {
  modalText.innerText = text;
  modal.classList.remove("hidden");
  // Small timeout to allow CSS transition to catch the removal of "hidden"
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeMessage() {
  modal.classList.remove("show");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

// Close modal when clicking button or background
closeModalBtn.addEventListener("click", closeMessage);
modal.addEventListener("click", closeMessage);
// Prevent closing when clicking inside the white box
modal
  .querySelector(".modal-content")
  .addEventListener("click", (e) => e.stopPropagation());

// --- Update the Floating Notes Function ---
function spawnFloatingNotes() {
  secretMessages.forEach((msg) => {
    const note = document.createElement("div");
    note.classList.add("floating-note");

    // Clean SVG (No text)
    note.innerHTML = `
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="#FFB6C1" stroke="#FF69B4" stroke-width="2"/>
        <path d="M22 6L12 13L2 6" stroke="#FF69B4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Left/Right Zone Logic
    const side = Math.floor(Math.random() * 2);
    let x;
    if (side === 0) {
      x = Math.random() * 20 + 5; // Left Side (5-25vw)
    } else {
      x = Math.random() * 20 + 75; // Right Side (75-95vw)
    }
    const y = Math.random() * 80 + 10;

    note.style.left = `${x}vw`;
    note.style.top = `${y}vh`;

    // Animation with Negative Delay (Instant start)
    note.style.animation = `floatAround ${Math.random() * 3 + 4}s ease-in-out infinite`;
    note.style.animationDelay = `-${Math.random() * 5}s`;

    // Click Logic
    note.onclick = (e) => {
      e.stopPropagation();
      showMessage(msg);
      note.style.opacity = "0";
      setTimeout(() => note.remove(), 300);
    };

    document.body.appendChild(note);
  });
}

// --- Event Listeners ---

noButton.addEventListener("click", () => {
  noCount++;
  noButton.innerText = getRandomPhrase();

  // Update GIF
  let gifIndex = (noCount % 8) + 1;
  // Ensure you have gifs named sad1.gif through sad8.gif
  mainGif.src = `gifs/sad${gifIndex}.gif`;

  // Growth & Wiggle
  yesSize += 0.15;
  yesContainer.style.transform = `scale(${yesSize})`;
  yesButton.classList.remove("wiggle");
  void yesButton.offsetWidth; // Trigger reflow
  yesButton.classList.add("wiggle");

  // Shrink No Button
  const noScale = Math.max(0.6, 1 - noCount * 0.05);
  noButton.style.transform = `scale(${noScale})`;

  // Intensity Logic
  if (heartIntervalTime > 20) {
    heartIntervalTime -= 40;
    startHeartRain();
  }
  if (noCount % 2 === 0 && extraColors.length > 0) {
    activeColors.push(extraColors.shift());
  }
});

// --- Update the Yes Button Listener ---
yesButton.addEventListener("click", () => {
  // A. Success Page
  // Note: We used 'gentle-bounce' instead of 'animate-bounce'
  container.innerHTML = `
    <div class="flex flex-col items-center gentle-bounce">
      <div class="w-64 h-64 overflow-hidden rounded-2xl bg-transparent mb-6">
        <img src="gifs/happy.gif" alt="Happy" 
             class="w-full h-full object-contain border-none outline-none shadow-none"
             style="mix-blend-mode: multiply;">
      </div>
      <h1 class="text-4xl font-bold text-pink-600 mb-4 drop-shadow-md">
        You've got me blushing like crazy, UB! ❤️
      </h1>
      <p class="text-gray-700 text-xl italic mb-4">
        I knew you'd give in, Cutu! 💖
      </p>
      <p class="text-md text-gray-500 animate-pulse">(Tap the floating envelopes for more 🙈!)</p>
    </div>
  `;

  // B. Spawn Notes
  spawnFloatingNotes();

  // C. Fireworks
  setInterval(() => {
    const colors = ["#ff0000", "#ffa500", "#ffff00", "#ff00ff", "#0000ff"];
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    confetti({
      particleCount: 20,
      spread: 360,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      colors: colors,
      shapes: ["heart"],
      disableForReducedMotion: true,
    });
  }, 500);
});
