 //define calculator object
 const calculator = {
    dispValue: '0',
    firstInput: null,
    secondInput: 0,
    expectSecondInput: false,
    operator: null,
    calcResult: null
  }

//define constant variables for buttons
const numberButtons = document.querySelectorAll('.number-btn');
const operationButtons = document.querySelectorAll('.operator-btn');
const equalsButton = document.querySelector('.equals-btn');
const deleteButton = document.querySelector('.delete-btn');
const clearButton = document.querySelector('.clear-btn');
const dotButton = document.querySelector('.dot-btn');
let disp = document.getElementById("disp");

//called the updateDisplay function so it shows 0 when nothing is selected
updateDisplay();
console.log(calculator);

//add event listener to number buttons and display numbers
//solved the undefined issue
numberButtons.forEach(number => {

        number.addEventListener('click', (e) => {
            if (calculator.calcResult != null) {
                calculator.calcResult = null;
                clearDisplay();
                reset();
            }
            number.value = e.target.value;
            //checks if the display is set to 0 in order to replace the 0 instead of adding numbers after it
            (calculator.dispValue == '0') ? calculator.dispValue = number.value : calculator.dispValue += number.value;
            disp.textContent = calculator.dispValue;  
            console.log(calculator);            
    })
})
//add event listener to operator buttons
operationButtons.forEach(operator => 
    operator.addEventListener("click", (e) => {
        if(calculator.operator === null){        
        console.log(calculator);
        //stores the first operand into calculator.firstInput
        calculator.firstInput = parseFloat(calculator.dispValue);
        operator.value = e.target.value;

        //turns operator name to symbol then displays
        if (operator.value === "add"){
            calculator.dispValue = "+"
            disp.textContent = calculator.dispValue; 
        }
        else if(operator.value === "subtract"){
        calculator.dispValue = "-"
        disp.textContent = calculator.dispValue; 
        }
        else if(operator.value === "multiply"){
        calculator.dispValue = "×"
        disp.textContent = calculator.dispValue; 
        }
        else if(operator.value === "divide"){
        calculator.dispValue = "÷"
        disp.textContent = calculator.dispValue; 
        } 
        //stores the chosen operator
        calculator.operator = operator.value;                
        calculator.expectSecondInput = true;        
        clearDisplay();               
        }
        else if (calculator.operator == "equals"){  
            calculator.calcResult = calculate( calculator.firstInput, parseFloat(calculator.dispValue), calculator.operator);       
            operator.value = e.target.value;
            if (operator.value === "add"){
                calculator.dispValue = "+"
                disp.textContent = calculator.dispValue; 
            }
            else if(operator.value === "subtract"){
            calculator.dispValue = "-"
            disp.textContent = calculator.dispValue; 
            }
            else if(operator.value === "multiply"){
            calculator.dispValue = "×"
            disp.textContent = calculator.dispValue; 
            }
            else if(operator.value === "divide"){
            calculator.dispValue = "÷"
            disp.textContent = calculator.dispValue; 
            }     
            //stores the chosen operator
            calculator.operator = operator.value;                
            calculator.expectSecondInput = true;        
            clearDisplay();   

        }
        else {  
            calculator.expectSecondInput = false;
            console.log(calculator);            
            calculator.calcResult = calculate( calculator.firstInput, parseFloat(calculator.dispValue), calculator.operator);            
            calculator.firstInput = calculator.calcResult;
            //turns operator name to symbol then displays
            if (operator.value === "add"){
                calculator.dispValue = "+"
                disp.textContent = calculator.dispValue; 
                }
            else if(operator.value === "subtract"){
                calculator.dispValue = "-"
                disp.textContent = calculator.dispValue; 
                }
            else if(operator.value === "multiply"){
                calculator.dispValue = "×"
                disp.textContent = calculator.dispValue; 
                }
            else if(operator.value === "divide"){
                calculator.dispValue = "÷"
                disp.textContent = calculator.dispValue; 
            }
            //stores the chosen operator
        calculator.operator = operator.value;                
        calculator.expectSecondInput = true;        
        clearDisplay(); 
        }
        })
        )
//when equals is pressed calculate and display. const calculator: expectSecondInput to false
//add event listener for equals button
equalsButton.addEventListener("click", (e) => {
    if(calculator.operator == null) {
        updateDisplay();
    } 
    else {
    calculator.secondInput = calculator.dispValue;    
    calculator.calcResult = calculate(calculator.firstInput,  parseFloat(calculator.secondInput), calculator.operator);
    clearDisplay();
    document.getElementById("disp").innerHTML = calculator.calcResult;    
    calculator.secondInput = null;
    calculator.operator = "equals";
    calculator.firstInput = calculator.calcResult;
    calculator.expectSecondInput = true;
    console.log(calculator);}
})

//Add decimal, only if not there already
dotButton.addEventListener("click", (e) => {
  if (!calculator.dispValue.includes('.')) {
    calculator.dispValue += '.';
  }
})

//adding a function to update the display to the calculator.dispValue 
function updateDisplay() {
    const display = document.getElementById("disp");
    display.innerHTML = calculator.dispValue;
}

//add a function to clear the display
function clearDisplay() {
    calculator.dispValue = '0';
}

//add event listener for clear display and call function
clearButton.addEventListener("click", (e) => {
    console.log(calculator);
    clearDisplay();
    reset();
    updateDisplay();    
})

deleteButton.addEventListener("click", (e) =>{
    console.log(calculator);
    if (calculator.operator === "equals") {
        clearDisplay();
        reset();        
        updateDisplay();
    }
    else if (calculator.operator != null) {        
        calculator.dispValue = calculator.firstInput;
        updateDisplay()
        calculator.operator = null;}
        if (calculator.expectSecondInput=== true) {                       
            calculator.dispValue = calculator.dispValue.slice(0,-1);
                if (calculator.dispValue == "") {
                    calculator.dispValue == calculator.operator;
                }
        }    
    else if(calculator.dispValue == '0' || (calculator.dispValue.length == 1 && calculator.expectSecondInput === false)){
        clearDisplay();
        reset();        
        updateDisplay();
    }            
    else {              
    calculator.dispValue = calculator.dispValue.slice(0,-1);
    if (calculator.dispValue == "") {
        calculator.dispValue = "0";
    }
    updateDisplay();} 
})
  
//add a function to calculate and return the result
function calculate(num1, num2, operator) {   
        console.log(calculator);
        if(operator == "add") {
           return num1 + num2;
        }
        else if (operator == "subtract") {
            return (num1 - num2);
        }
        else if (operator == "divide") {
           return num1/num2;
        }
        else if (operator == "multiply"){
           return num1*num2;
        }
    }

function reset() {
    calculator.firstInput = null;
    calculator.secondInput = 0;
    calculator.operator = null;
    calculator.expectSecondInput = false;
    calculator.calcResult = null
}