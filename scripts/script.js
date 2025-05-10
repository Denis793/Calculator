let firstNumber = '';
let secondNumber = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];

const previous = document.querySelector('.previous');
const current = document.querySelector('.current');
const buttons = document.querySelector('.buttons');

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  sign = '';
  finish = false;
  current.textContent = '0';
  previous.textContent = '';
}

document.querySelector('.ac').addEventListener('click', clearAll);

buttons.addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.classList.contains('button') || btn.classList.contains('ac')) return;

  const key = btn.textContent;

  if (digit.includes(key)) {
    if (sign === '' && !finish) {
      firstNumber += key;
      current.textContent = firstNumber;
    } else if (firstNumber !== '' && finish) {
      secondNumber = key;
      finish = false;
      current.textContent = secondNumber;
    } else {
      secondNumber += key;
      current.textContent = secondNumber;
    }
    return;
  }

  if (action.includes(key)) {
    sign = key;
    previous.textContent = `${firstNumber} ${sign}`;
    current.textContent = '';
    return;
  }

  if (key === '=') {
    if (!secondNumber) secondNumber = firstNumber;

    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);

    switch (sign) {
      case '+':
        firstNumber = a + b;
        break;
      case '-':
        firstNumber = a - b;
        break;
      case '*':
        firstNumber = a * b;
        break;
      case '/':
        if (b === 0) {
          current.textContent = 'Error';
          clearAll();
          return;
        }
        firstNumber = a / b;
        break;
    }

    finish = true;
    current.textContent = firstNumber;
    previous.textContent = '';
  }
});
