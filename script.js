const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
let input = "";
function appendNumber(number){
    if(display.innerText === "0") display.innerText = "";
    display.innerText += number;
    input += number;
}
function appendOperator(op){
    const lastChar = input.slice(-1);
    if("+-*/%".includes(lastChar)){
        input = input.slice(0,-1) + op;
    }else{
        input += op;
    }
    display.innerText = input;
}
function clearDisplay(){
    input ="";
    display.innerText = "0";
}
function deleteLast(){
    input = input.slice(0,-1);
    display.innertext = input || "0";
}
function calculateResult(){
    try{
        let result = eval(input);
        result = parseFloat(result.toFixed(10));
        addToHistory(`${input} = ${result}`);
        display.innerText = result;
        input = result.toString();
    }catch{
        display.innerText = "Error";
        input = "";
    }
}

function addToHistory(entry){
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li);
}
function toggleTheme(){
    document.body.classList.toggle("dark");
}
document.addEventListener("keydown", (e) =>{
    const key = e.key;
    if(!isNaN(key) || key === ".")appendNumber(key);
    else if ("+-*/%".includes(key)) appendOperator(key);
    else if (key === "Enter") calculateResult();
    else if (key === "Backspace") deleteLast();
    else if (key === "Escape") clearDisplay();
});