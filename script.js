let currentAudio = null;
let playSessionId = 0;
let isPaused = false;
let pausedIndex = 0;
let pausedLetters = [];

function startSpelling() {
  const input = document.getElementById('textInput').value.toUpperCase();
  const letters = input.split('');

  playSessionId++;
  isPaused = false;
  pausedLetters = letters;
  pausedIndex = 0;

  playLetters(letters, 0, playSessionId);
}

function playLetters(letters, index = 0, sessionId) {
  if (index >= letters.length || sessionId !== playSessionId || isPaused) return;

  const letter = letters[index];
  let audio;

  if (letter === ' ') {
    audio = new Audio('audio/SPACE.mp3');
  } else if (/[A-Z]/.test(letter)) {
    audio = new Audio(`audio/${letter}.mp3`);
  } else {
    playLetters(letters, index + 1, sessionId);
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = audio;
  audio.play();

  audio.onended = () => {
    if (!isPaused) {
      pausedIndex = index + 1;
      playLetters(letters, index + 1, sessionId);
    }
  };
}

// === Pause/Resume button ===

function togglePause() {
  if (isPaused) {
    isPaused = false;
    playLetters(pausedLetters, pausedIndex, playSessionId);
  } else {
    isPaused = true;
    if (currentAudio) {
      currentAudio.pause();
    }
  }
}

// === New code for letter buttons ===

function createLetterButtons() {
  const container = document.getElementById('letterButtons');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.onclick = () => {
      playSessionId++; // Cancel sentence playback
      isPaused = false;
      const audio = new Audio(`audio/${letter}.mp3`);
      audio.play();
    };
    container.appendChild(btn);
  });
}

// === Setup when page loads ===

window.onload = () => {
  createLetterButtons();

  // Add Pause/Resume button
  const pauseBtn = document.createElement('button');
  pauseBtn.textContent = '⏸ Pause / Resume';
  pauseBtn.onclick = togglePause;

  document.getElementById('controls').appendChild(pauseBtn);
};
