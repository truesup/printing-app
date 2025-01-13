import { paragraphs } from './paragraphs.js';

const windowWidth = window.innerWidth;
const wrapperOuter = document.querySelector('.wrapper-outer');

// if (windowWidth < 1024) {
//   wrapperOuter.classList.add('visually-hidden');
//   const div = document.createElement('div');
//   div.textContent = "App doesn't work on small devices";
//   div.style.color = '#f1f1f1';
//   div.style.fontSize = '20px';
//   document.body.appendChild(div);
// } else {
//   wrapperOuter.classList.remove('visually-hidden');
// }

const typingText = document.querySelector('.paragraph p');
const input = document.querySelector('input');

let charIndex = 0;

function getRandomText() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randomIndex].split('').forEach(span => {
    const spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  document.addEventListener('keydown', () => {
    input.focus();
  });
  typingText.addEventListener('click', () => {
    input.focus();
  });
}

function initializeTyping() {
  const characters = typingText.querySelectorAll('span');
  let typedChar = input.value.split('')[charIndex];

  if (typedChar == null) {
    charIndex--;
    characters[charIndex].classList.remove('correct', 'incorrect');
  } else {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add('correct');
    } else {
      characters[charIndex].classList.add('incorrect');
    }

    charIndex++;
  }

  characters.forEach(span => span.classList.remove('active'));
  characters[charIndex].classList.add('active');
}

getRandomText();

input.addEventListener('input', initializeTyping);
