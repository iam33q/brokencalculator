import { useState, useEffect, useRef } from "react";
import React from "react";
import "./App.scss"; 

function App() {

  const [display, setDisplay] = useState(" ");
  const [operationDisplay, setOperationDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [message, setMessage] = useState("Just use your keyboard");
  const [resultDisplay, setResultDisplay] = useState("");
  // const [number1, number2, number3, number4, number5,number6, number7, number8, number9, number0] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  
  useEffect(() => {
    const keypresses = (event) => {
        if (event.key == "0"||"1"||"2"||"3"||"4"){
          setDisplayWithEvent(Number(event.key));
          console.log("|",display,"|", lastOperator,"|", operationDisplay,"|");
        } else if (event.key == "5"||"6"||"7"||"8"||"9"){
          setDisplayWithEvent(Number(event.key));
          console.log("|",display,"|", lastOperator,"|", operationDisplay,"|");
        } else if (event.key == "c"){
          Clear();
        } 
        switch(event.key){
          case "+": operatorClicked(event.key)
          case "-": operatorClicked(event.key)
          case "*": operatorClicked(event.key)
          case "/": operatorClicked(event.key)
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

  const setDisplayWithEvent = (number) => {
    if (number == null || undefined || ""){return false}
    if (display === 0){setDisplay("")}
    console.log(display, number)
    setDisplay(display + number);
    console.log(display, lastOperator, operationDisplay);
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

  function operatorClicked(value){
    let mitmdisplay = display;
    setLastOperator(value);
    setOperationDisplay(mitmdisplay);
    setDisplay("");
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
        default : setMessage("Unknown Operator");
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
    <div>
      {/* <button value="0" key="0" onClick={setDisplayWithEvent(0)} >0</button><br/>
      <button value="1" key="1" onClick={setDisplayWithEvent(1)} >1</button><br/>
      <button value="2" key="2" onClick={setDisplayWithEvent(2)} >2</button><br/>
      <button value="3" key="3" onClick={setDisplayWithEvent(3)} >3</button><br/>
      <button value="4" key="4" onClick={setDisplayWithEvent(4)} >4</button><br/>
      <button value="5" key="5" onClick={setDisplayWithEvent(5)} >5</button><br/>
      <button value="6" key="6" onClick={setDisplayWithEvent(6)} >6</button><br/>
      <button value="7" key="7" onClick={setDisplayWithEvent(7)} >7</button><br/>
      <button value="8" key="8" onClick={setDisplayWithEvent(8)} >8</button><br/>
      <button value="9" key="9" onClick={setDisplayWithEvent(9)} >9</button><br/> 
      
      some BS about to many re-renders*/}

    </div>
{/* 
    <button onClick={Clear}>C           </button>
    <button onClick={equalsClicked}>   =</button> */}
    {/* <button onClick={useResult}>Ans     </button><br/>
    <button id="counter1" value="+" onClick={() => operatorClicked("+")}>  +</button>
    <button id="counter2" value="-" onClick={() => operatorClicked("-")}>  -</button>
    <button id="counter3" value="*" onClick={() => operatorClicked("*")}>  *</button>
    <button id="counter4" value="/" onClick={() => operatorClicked("/")}>  /</button> <br/> */}
    <span>  {resultDisplay} </span> <br/>
    <span>  {message}       </span>
  </div>
  );
}
export default App;