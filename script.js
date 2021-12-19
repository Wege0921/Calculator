//const displayHistory = document.querySelector('.displayHistory');
//const displayTemp = document.querySelector('.displayTemp');
const displayResult = document.querySelector('.displayResult');
const operators = document.querySelectorAll('.operator');
const clear = document.getElementById('clear');
const backSpace = document.getElementById('backSpace');
const equal = document.getElementById('equal-sign');
const numbers = document.querySelectorAll('.number');

let a, b;
let current = '';
let next = '';
let result;
let operatorName = '';
let isdecimal= false;

clear.addEventListener('click', ()=>{
    displayResult.textContent = '0';
    current = '';
});

backSpace.addEventListener('click', ()=>{
    var newDisplay = displayResult.innerText.slice(0, -1);
    displayResult.innerText = newDisplay;
    current = newDisplay;
});

numbers.forEach(number => {
    number.addEventListener('click', (e)=>{
    if (e.target.innerText. includes('.') && !isdecimal)
    {
        isdecimal = true;
    }

    else if (!e.target.innerText.includes('.')){
        isdecimal = false;
    }
    else if (e.target.innerText.includes('.') && isdecimal) return;
   
    current += e.target.innerText; 
    displayResult.innerText = current;

});

});

operators.forEach(operator => {
    operator.addEventListener('click', (e)=>{
    if (!current) return;

    if(operatorName && current && result){
        operate();
    }
    else{
        result = parseFloat(current);
    }
 
    isdecimal = false;
    let operationClicked = e.target.innerText;
    operatorName = operationClicked; 
    //next = current + " " + operatorName;
    console.log('number', result); 
    console.log('operationName', operationClicked); 
    current = '';  
});

});

equal.addEventListener('click', () => {

    if(!result && !operatorName){
        alert('Please enter a number & an operator.');
        return;
    }
    else if(!current){
        alert('Please enter the next number.');
        return;
    }
    else{ 
        operate();
        current = '';
        operatorName = '';
    }
    current=result;
});

function operate(){
    if(operatorName === '+'){
        result = parseFloat(result) + parseFloat(current);
        displayResult.innerText = Math.round((result + Number.EPSILON)*100)/100;
    }
    else if(operatorName === '-'){

        result = parseFloat(result) - parseFloat(current);
        displayResult.innerText = Math.round((result + Number.EPSILON)*100)/100;
    }
    else if(operatorName === '÷'){
        if(current === '0'){
            alert(`Error!, =>Division by Zero`);
         }else{
            result = parseFloat(result) / parseFloat(current);
            displayResult.innerText = Math.round((result + Number.EPSILON)*100)/100; 
         }
    }
    else if(operatorName === '×'){

        result = parseFloat(result) * parseFloat(current);
        displayResult.innerText = Math.round((result + Number.EPSILON)*100)/100;
    }
    else if(operatorName === '%'){
        result = parseFloat(result) % parseFloat(current);
        displayResult.innerText = Math.round((result + Number.EPSILON)*100)/100;
    }
}
   // ----------------------keyboard input-----------------------  
window.addEventListener('keydown', (e) =>{
    if(e.key === '0' ||
       e.key === '1' ||
       e.key === '2' ||
       e.key === '3' ||
       e.key === '4' ||
       e.key === '5' ||
       e.key === '6' ||
       e.key === '7' ||
       e.key === '8' ||
       e.key === '9' || 
       e.key === '.' )
       {
        current += e.key;
        displayResult.innerText = current; 
        }
    else if (e.key === '+' ||
             e.key === '-' ||
             e.key === '%' 
    ){
        operatorWindow(e.key)
 
    }
    else if (e.key === '*' )
    {
        operatorWindow('×')
    }
    else if (e.key === '/' )
    {
        operatorWindow('÷')
    }

    else if (e.key === 'Enter' || e.key === '=')
    {
        equalWindow(e.key)
    }
    else if (e.key === 'Backspace')
    {
        backWindow(e.key)
    }
    else if (e.key === 'Escape')
    {
        clearWindow(e.key)
    }
    
});

function operatorWindow(key){
    operators.forEach(button =>{
        if(button.innerText === key){
            button.click();
        }
    });
}

function equalWindow(){
   equal.click();
    
}
function backWindow(){
    backSpace.click();
     
 }
 function clearWindow(){
    clear.click();
     
 }