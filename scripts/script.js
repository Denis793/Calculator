let firstNumber ='';       
let secondNumber ='';       
let sign ='';               // знак операції(+-*/)
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',];
const action = ['-', '+', '*', '/'];

// екран
const out = document.querySelector('.calculatorScreen p')

function clearAll (){
    firstNumber = '';    //first number and result
    secondNumber = '';
    sign = '';
    finish = false;
    out.textContent = 0;  
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // натиснута не клавіша
    if (!event.target.classList.contains('button')) return;
    // натиснута клавіша clearAll AC
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';

    // отримання натиснутої клавіші 
    const key = event.target.textContent;
     
    // якщо натиснута клавіша 0-9 або '.' - (крапка)
    if (digit.includes(key)) {
        if (secondNumber === ''&& sign ===''){
            firstNumber += key;
            out.textContent = firstNumber;
        }
        else if (firstNumber!=='' && secondNumber!=='' && finish){
            secondNumber = key;
            finish = false;
            out.textContent = firstNumber;
        }
        else{
            secondNumber += key;
            out.textContent = secondNumber;
        }
        console.log(firstNumber, secondNumber, sign)
    }

    // якщо натиснута клавіша +-/*
    if(action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(sign);
        return;
    }

    // натиснута клавіша =
    if(key ==='='){
        if(secondNumber ==='') secondNumber = firstNumber;
        switch(sign){
            case "+":
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case "-":
                firstNumber = firstNumber - secondNumber;
                break;
            case "*":
                firstNumber = firstNumber * secondNumber;
                break;
            case "/":
                if(secondNumber === 0){
                    out.textContent = 'Помилка'
                }
                firstNumber = firstNumber / secondNumber;
                break;
        }
        finish = true;
        out.textContent = firstNumber;
        console.log(firstNumber, secondNumber, sign)
    }
}