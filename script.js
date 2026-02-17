const keys = document.querySelectorAll(".Key");
let isMouseDown = false;

// Preload all sounds
const sounds = {};

keys.forEach(key => {
  let keyNumber = key.dataset.key;

  // Add leading zero if number < 10
  if (keyNumber < 10) {
    keyNumber = "0" + keyNumber;
  }

  sounds[key.dataset.key] = new Audio(`24-piano-keys/key${keyNumber}.mp3`);
});

// Play sound
function playSound(number) {
  const audio = sounds[number];
  audio.currentTime = 0;
  audio.play();
}

// Activate visual effect
function activateKey(key) {
  key.classList.add("active");

  setTimeout(() => {
    key.classList.remove("active");
  }, 100);
}

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

keys.forEach(key => {

  // Normal click (single press)
  key.addEventListener("mousedown", () => {
    const number = key.dataset.key;
    playSound(number);
    activateKey(key);
  });

  // Drag effect
  key.addEventListener("mouseenter", () => {
    if (isMouseDown) {
      const number = key.dataset.key;
      playSound(number);
      activateKey(key);
    }
  });

});


// Mouse click
// keys.forEach(key => {
//   key.addEventListener("click", () => {
//     const number = key.dataset.key;
//     playSound(number);
//     activateKey(key);
//   });
// });

// Keyboard press
document.addEventListener("keydown", (e) => {
  const pressedKey = e.key.toUpperCase();

  keys.forEach(key => {
    if (key.textContent === pressedKey) {
      const number = key.dataset.key;
      playSound(number);
      activateKey(key);
    }
  });

  console.log("Pressed:", e.key);
});

