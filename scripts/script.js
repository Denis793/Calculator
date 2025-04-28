let firstNumber = '';
let secondNumber = '';
let sign = ''; // operation sign(+-*/)
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];

// screen
const out = document.querySelector('.calculatorScreen p');

function clearAll() {
  firstNumber = ''; //first number and result
  secondNumber = '';
  sign = '';
  finish = false;
  out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  // wrong key pressed
  if (!event.target.classList.contains('button')) return;
  // clearAll AC key pressed
  if (event.target.classList.contains('ac')) return;

  out.textContent = '';

  // getting the key pressed
  const key = event.target.textContent;

  // if the 0-9 key or '.' - (period) is pressed
  if (digit.includes(key)) {
    if (secondNumber === '' && sign === '') {
      firstNumber += key;
      out.textContent = firstNumber;
    } else if (firstNumber !== '' && secondNumber !== '' && finish) {
      secondNumber = key;
      finish = false;
      out.textContent = firstNumber;
    } else {
      secondNumber += key;
      out.textContent = secondNumber;
    }
    console.log(firstNumber, secondNumber, sign);
  }

  // if the +-/* key is pressed
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(sign);
    return;
  }

  // if the = key is pressed
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
        if (secondNumber === 0) {
          out.textContent = 'Error';
        }
        firstNumber = firstNumber / secondNumber;
        break;
    }
    finish = true;
    out.textContent = firstNumber;
    console.log(firstNumber, secondNumber, sign);
  }
};
