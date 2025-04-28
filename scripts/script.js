// Змінні для чисел і знака
let firstNumber = '';
let secondNumber = '';
let sign = '';
let finish = false;

// Клавіші
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];

// Вибираємо екрани
const previous = document.querySelector('.previous');
const current = document.querySelector('.current');

// Очистити все
function clearAll() {
  firstNumber = '';
  secondNumber = '';
  sign = '';
  finish = false;
  current.textContent = 0;
  previous.textContent = '';
}

// Клік по кнопці "AC"
document.querySelector('.ac').onclick = clearAll;

// Обробка натискання кнопок
document.querySelector('.buttons').onclick = (event) => {
  // Не кнопка - ігноруємо
  if (!event.target.classList.contains('button')) return;

  // Кнопка "AC" - ігноруємо (бо є окремий обробник)
  if (event.target.classList.contains('ac')) return;

  const key = event.target.textContent;

  // Натиснута цифра або крапка
  if (digit.includes(key)) {
    if (secondNumber === '' && sign === '') {
      firstNumber += key;
      current.textContent = firstNumber;
    } else if (firstNumber !== '' && secondNumber !== '' && finish) {
      secondNumber = key;
      finish = false;
      current.textContent = secondNumber;
    } else {
      secondNumber += key;
      current.textContent = secondNumber;
    }
    return;
  }

  // Натиснуто знак операції
  if (action.includes(key)) {
    sign = key;
    previous.textContent = firstNumber + ' ' + sign;
    current.textContent = '';
    return;
  }

  // Натиснуто "="
  if (key === '=') {
    if (secondNumber === '') secondNumber = firstNumber;
    switch (sign) {
      case '+':
        firstNumber = +firstNumber + +secondNumber;
        break;
      case '-':
        firstNumber = firstNumber - secondNumber;
        break;
      case '*':
        firstNumber = firstNumber * secondNumber;
        break;
      case '/':
        if (secondNumber === '0') {
          current.textContent = 'Помилка';
          previous.textContent = '';
          firstNumber = '';
          secondNumber = '';
          sign = '';
          return;
        }
        firstNumber = firstNumber / secondNumber;
        break;
    }
    finish = true;
    current.textContent = firstNumber;
    previous.textContent = '';
  }
};
