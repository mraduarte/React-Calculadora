import React from 'react'
import { useState } from 'react'
import './Calculator.css'

function Calculator() {

    const [currentValue, setCurrentValue] = useState("0");
    const [pendingOperation, setPendingOperation] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [completeOperation, setCompleteOperation] = useState("");

    const keypadnumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operations = ["+", "-", "*", "/"];

    const handleClick = (val) => {
        setCurrentValue((prevValue) => {
            if(prevValue === "0"){
                return val;
            }else{
                return prevValue + val;
            }
        });

        setCompleteOperation((prevOperation) => prevOperation + val);
    };

    const handleClear = () => {
        setCurrentValue("0");
        setPendingOperation(null);
        setPendingValue(null);
        setCompleteOperation("");
    };

    const handleOperation = (operation) => {
        setCompleteOperation(currentValue + " " + operation);
        setPendingOperation(operation);
        setPendingValue(currentValue);
        setCurrentValue('0');
    }

    const handleCalculate = () => {
        if(!pendingOperation || !pendingValue){
            return;
        }

        const num1 = parseFloat(pendingValue);
        const num2 = parseFloat(currentValue);

        let result;

        switch (pendingOperation) {
            case "+": 
            result = num1 + num2;
            break; 
            case "-": 
            result = num1 - num2;
            break;  
            case "*": 
            result = num1 * num2;
            break;  
            case "/": 
            if(num2 != 0){
                result = num1 / num2;
            }else{
                setCurrentValue("Error");
                setCompleteOperation("Error");
                setPendingOperation(null);
                setPendingValue(null);
                return;
            }
            break; 

            default:
                break;
        }

        setCompleteOperation(pendingValue + " " + pendingOperation + " " + currentValue + " = " + result);

        setCurrentValue(result.toString());
        setPendingOperation(null);
        setPendingValue(null);
    }

  return <div className="calculator">
    <div className="complete-operation">{completeOperation}</div>
    <div className="display">{currentValue}</div>
    <div className="buttons">
        <button onClick={handleClear} className='button'>AC</button>
        {keypadnumbers.map((num) => (
            <button key={num} onClick={() => handleClick(num)} className='button'>{num}</button>
        ))}
        {operations.map((operation) => (
            <button key={operation} onClick={() => handleOperation(operation)} className='button'>{operation}</button>
        ))}
    <button onClick={handleCalculate} className='button'>=</button>
    </div>
  </div>
}

export default Calculator