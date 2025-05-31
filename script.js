function startSpelling() {
  const input = document.getElementById('textInput').value.toUpperCase();
  const letters = input.replace(/[^A-Z]/g, '').split('');
  playLetters(letters);
}

function playLetters(letters, index = 0) {
  if (index >= letters.length) return;

  const letter = letters[index];
  const audio = new Audio(`audio/${letter}.mp3`);

  audio.play();
  audio.onended = () => playLetters(letters, index + 1);
}

// === New code for letter buttons ===

function createLetterButtons() {
  const container = document.getElementById('letterButtons');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.onclick = () => {
      const audio = new Audio(`audio/${letter}.mp3`);
      audio.play();
    };
    container.appendChild(btn);
  });
}

// Call it once the page loads
window.onload = () => {
  createLetterButtons();
};
