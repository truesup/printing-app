import { paragraphs } from './paragraphs.js';

const typingParagraph = document.querySelector('.paragraph p');
const typingInput = document.querySelector('.typing-input');

let typingChars;
let currentChar = 0;

document.addEventListener('DOMContentLoaded', () => {
  const paragraph = getRandomParagraph();

  for (let el of paragraph) {
    const span = document.createElement('span');
    span.innerText = el;
    typingParagraph.appendChild(span);
  }

  typingChars = document.querySelectorAll('.paragraph p span');
  typingParagraph.querySelector('span').classList.add('active');
});

function getRandomParagraph() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

typingInput.addEventListener('input', () => {
  const currentValue = typingInput.value[typingInput.value.length - 1];

  if (currentValue === typingChars[currentChar].textContent) {
    typingChars[currentChar].classList.add('correct');
  } else {
    typingChars[currentChar].classList.add('incorrect');
  }
  typingChars[currentChar].classList.remove('active');

  currentChar++;
  if (currentChar < typingChars.length) {
    typingChars[currentChar].classList.add('active');
  } else {
    typingInput.value = '';
  }
});

typingInput.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    if (currentChar > 0) {
      typingChars[currentChar].classList.remove('active');
      currentChar--;
      typingChars[currentChar].classList.remove('correct', 'incorrect');
      typingChars[currentChar].classList.add('active');
      typingInput.value = typingInput.value.slice(0, -1);
    }
    e.preventDefault();
  }
});

// const windowWidth = window.innerWidth;
// const wrapperOuter = document.querySelector('.wrapper-outer');

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
