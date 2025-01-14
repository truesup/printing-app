import { paragraphs } from './paragraphs.js';

const typingParagraph = document.querySelector('.paragraph p');
const typingInput = document.querySelector('.typing-input');
const timerDisplay = document.querySelector('.time span');
const mistakesDisplay = document.querySelector('.mistakes span');
const wpmDisplay = document.querySelector('.wpm span');
const resetButton = document.querySelector('.reset-button');

let typingChars;
let currentChar = 0;

let timer;
let timeLeft = 60;
let timerStarted = false;

let mistakesCount = 0;
let correctCharsCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadNewParagraph();
});

function loadNewParagraph() {
  typingParagraph.innerHTML = '';
  const paragraph = getRandomParagraph();

  for (let el of paragraph) {
    const span = document.createElement('span');
    span.innerText = el;
    typingParagraph.appendChild(span);
  }

  typingChars = document.querySelectorAll('.paragraph p span');
  typingParagraph.querySelector('span').classList.add('active');

  resetValues();
}

function getRandomParagraph() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function resetValues() {
  timeLeft = 60;
  timerStarted = false;
  mistakesCount = 0;
  correctCharsCount = 0;
  currentChar = 0;

  typingInput.value = '';
  typingInput.disabled = false;
  typingChars.forEach(char =>
    char.classList.remove('correct', 'incorrect', 'active')
  );
  typingChars[0].classList.add('active');

  timerDisplay.textContent = `${timeLeft}s`;
  mistakesDisplay.textContent = mistakesCount;
  wpmDisplay.textContent = 0;

  clearInterval(timer);
}

typingParagraph.addEventListener('click', () => {
  typingInput.focus();
});

typingInput.addEventListener('input', () => {
  const currentValue = typingInput.value[typingInput.value.length - 1];
  const currentCharElem = typingChars[currentChar];

  if (currentValue === currentCharElem.textContent) {
    currentCharElem.classList.add('correct');
    correctCharsCount++;
  } else {
    if (!currentCharElem.classList.contains('incorrect')) {
      mistakesCount++;
      mistakesDisplay.textContent = mistakesCount;
    }
    currentCharElem.classList.add('incorrect');
  }

  currentCharElem.classList.remove('active');
  currentChar++;

  if (currentChar < typingChars.length) {
    typingChars[currentChar].classList.add('active');
  } else {
    typingInput.value = '';
  }
});

typingInput.addEventListener('keydown', e => {
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  if (e.key === 'Backspace') {
    if (currentChar > 0) {
      typingChars[currentChar].classList.remove('active');
      currentChar--;

      const currentCharElem = typingChars[currentChar];

      if (currentCharElem.classList.contains('incorrect')) {
        mistakesCount--;
        mistakesDisplay.textContent = mistakesCount;
      }

      if (currentCharElem.classList.contains('correct')) {
        correctCharsCount--;
      }

      currentCharElem.classList.remove('correct', 'incorrect');
      currentCharElem.classList.add('active');
      typingInput.value = typingInput.value.slice(0, -1);
    }
    e.preventDefault();
  }
});

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = `${timeLeft}s`;
      calculateWPM();
    } else {
      clearInterval(timer);
      timerDisplay.textContent = '0s';
      disableInput();
      alert('Time is up!');
    }
  }, 1000);
}

function calculateWPM() {
  const wpm = Math.round(correctCharsCount / 5 / ((60 - timeLeft) / 60));
  wpmDisplay.textContent = wpm || 0;
}

function disableInput() {
  typingInput.disabled = true;
  typingInput.blur();
}

resetButton.addEventListener('click', () => {
  loadNewParagraph();
});

// if (window.innerWidth < 1024) {
//   document.querySelector('.wrapper-outer').classList.add('visually-hidden');
//   const div = document.createElement('div');
//   div.textContent = "App doesn't work on small devices";
//   div.style.color = '#f1f1f1';
//   div.style.fontSize = '20px';
//   document.body.appendChild(div);
// } else {
//   document.querySelector('.wrapper-outer').classList.remove('visually-hidden');
// }
