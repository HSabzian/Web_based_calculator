// Select necessary elements
const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle number and operator button clicks
function handleButtonClick(e) {
    const value = e.target.getAttribute('data-value');

    if (value >= '0' && value <= '9') {
        // Handle number input
        currentInput += value;
        updateDisplay(currentInput);
        
    } else if (['+', '-', '*', '/'].includes(value)) {
        // Handle operator input
        if (currentInput === '' && previousInput === '') {
            // Do nothing if no input
            return;
        }

        if (currentInput !== '') {
            previousInput = currentInput;
            currentInput = '';
        }

        operator = value;
        updateDisplay(operator);
    }
}

// Function to handle equals button click
function handleEquals() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    // Update display and reset inputs
    updateDisplay(result);
    currentInput = result.toString();
    operator = '';
    previousInput = '';
}

// Function to handle clear button click
function handleClear() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

// Attach event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

equalsButton.addEventListener('click', handleEquals);
clearButton.addEventListener('click', handleClear);
