const display = document.querySelector(".ongoing");
const resultDisplay = document.querySelector(".result");
const buttons = document.querySelectorAll(".calc-btn");
let primaryNum = null;
let secondaryNum = null;
let operator = null;

buttons.forEach((button) => {
    document.addEventListener("keydown", (event) => {
        if(event.key == button.value) {
            errorCheck();
            calculatorInput(event.key);
        }
    });
    button.addEventListener("click", () => {
        errorCheck();
        calculatorInput(button.value);
    })
});

function calculate(numOne, operator, numTwo) {
    switch(operator) {
        case "+": return numOne + numTwo;
        case "-": return numOne - numTwo;
        case "*": return numOne * numTwo;
        case "/": return numOne / numTwo;
        case "%": return numOne % numTwo;
        default: return "error";
    }
}

function errorCheck() {
    if(display.textContent == "Error" || display.textContent == "NaN") {
        resetAll();
    }
}

function resetAll() {
    primaryNum = null;
    secondaryNum = null;
    operator = null;
    display.textContent = "";
    resultDisplay.textContent = "";
}

function writeValue(input) {
    display.textContent += input;
}

function decimalCheck (input) {
    if(display.textContent.includes(".")) {

    }
    else {
        display.textContent += input;
    }
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

function operate(input) {
    if (display.textContent === "") {
        operator = input;
        return;
    }
    else if(display.textContent != "") {
        if(primaryNum === null) {
            primaryNum = parseFloat(display.textContent);
        }
        else {
            secondaryNum = parseFloat(display.textContent);
            primaryNum = calculate(primaryNum, operator, secondaryNum); 
        }
        operator = input;
        display.textContent = "";
        resultDisplay.textContent = primaryNum;
    }
}

function equals() {
    if(display.textContent == "") {
        if(primaryNum === null) {
        }
    }
    else if (display.textContent != "") {
        if(primaryNum === null) {
        }
        else if(primaryNum != null) {
            secondaryNum = parseFloat(display.textContent);
            primaryNum = calculate(primaryNum, operator, secondaryNum);
            display.textContent = "";
            resultDisplay.textContent = primaryNum;
        }
    }
}

function calculatorInput(input) {
    switch(input) {
        case "%":
        case "/":
        case "*":
        case "-":
        case "+":
            operate(input);
            break;
        case "c":
            resetAll();
            break;
        case "Backspace":
            backspace();
            break;
        case ".":
            decimalCheck(input);
            break;
        case "=":
            equals();
            break;
        default:
            writeValue(input);
            break;
    }
}

