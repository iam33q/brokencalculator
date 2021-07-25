import { useState, useEffect } from "react";
import React from "react";
import "./App.scss"; 

function App() {

  const [display, setDisplay] = useState(" ");
  const [operationDisplay, setOperationDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [message, setMessage] = useState("");
  const [resultDisplay, setResultDisplay] = useState("");

  useEffect(() => {
    const keypresses = (event) => {
      console.log(event.key)
      switch(event.key){
        case "+":operatorClicked("+"); break;
        case "-":operatorClicked("-"); break;
        case "*":operatorClicked("*"); break;
        case "/":operatorClicked("/"); break;
        case "0":handleDisplayWithKey("0"); break;
        case "1":handleDisplayWithKey("1"); break;
        case "2":handleDisplayWithKey("2"); break;
        case "3":handleDisplayWithKey("3"); break;
        case "4":handleDisplayWithKey("4"); break;
        case "5":handleDisplayWithKey("5"); break;
        case "6":handleDisplayWithKey("6"); break;
        case "7":handleDisplayWithKey("7"); break;
        case "8":handleDisplayWithKey("8"); break;
        case "9":handleDisplayWithKey("9"); break;
      }
    }

    document.addEventListener('keydown', keypresses);
    return function cleanup() {
      document.removeEventListener('keydown', keypresses);
    }
  }, [])


  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  const handleDisplayWithKey = (value) =>{
    if (display == 0){setDisplay(value)}
    let newDisplay = new String(display + value);
    setDisplay(newDisplay);
  }

  const setDisplayWithEvent = (event) => {
    console.log(event)
    if (display == 0){setDisplay(event.target.value)}
    let newDisplay = display + event.target.value;
    setDisplay(newDisplay);
  };
  
  function Clear() {
    setDisplay(" ");
    setOperationDisplay("");
    setLastOperator("");
    setResultDisplay("");
  }

  const useResult = () => {
    let ans = Number(resultDisplay);
    Clear();
    setDisplay(ans);
  }

  const equalsClicked = () => {
    if(lastOperator == !("+"||"-"||"*"||"/")){
      setMessage("Please select an operator.")
      return false;
    } else if(isNumeric(operationDisplay) == false){
      setMessage("Please add a number to compute.")
      return false;
    }
    let calc = 0;
    console.log(calc,display,lastOperator,operationDisplay)
      switch(lastOperator){
        case "+": calc += (Number(operationDisplay) + Number(display)); break;
        case "-": calc += (Number(operationDisplay) - Number(display)); break;
        case "*": calc += (Number(operationDisplay) * Number(display)); break;
        case "/": calc += (Number(operationDisplay) / Number(display)); break;
      }
    setResultDisplay(calc);
    setDisplay("");
    setOperationDisplay("");
    setLastOperator("");
    setMessage("");
    }

  return (
  <div className="App App-header">
    <div className="calculatordisplay">{operationDisplay}{lastOperator}{display}</div><br />

    <div>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(function (number,i){
      return <button value={number} key={i} onClick={setDisplayWithEvent}>{number}</button>})}<br/>
    </div>

    <button value="c" onClick={Clear}>C</button>
    <button value="=" onClick={equalsClicked}>   =</button>
    <button value="a" onClick={useResult}>Ans</button><br/>
    
    <button id="counter1" value="+" onClick={() => operatorClicked("+")}>  +</button>
    <button id="counter2" value="-" onClick={() => operatorClicked("-")}>  -</button>
    <button id="counter3" value="*" onClick={() => operatorClicked("*")}>  *</button>
    <button id="counter4" value="/" onClick={() => operatorClicked("/")}>  /</button>
    <br/>
    <span>{resultDisplay}</span><br/>
    <span>{message}</span>
  </div>
  );
}
export default App;