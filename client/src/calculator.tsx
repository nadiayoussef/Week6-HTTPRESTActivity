import React, { useState } from 'react';
import './calculator.css';
import { CalculatorDisplay, CalculatorKey } from './components';
import { NumericKeys, OperatorKeys, ActionKeys } from './enums';

export default function Calculator() {
  
  const [display, setDisplay] = useState('');

  const numericKeyPressHandler = async (key: NumericKeys): Promise<void> => {
    alert('key pressed: ' + key);
  }

  const operatorKeyPressHandler = async (key: OperatorKeys): Promise<void> => {
    alert('key pressed: ' + key);
  }

  const actionKeyPressHandler = async (key: ActionKeys): Promise<void> => {
    alert('key pressed: ' + key);
  }

  return (
    <div className='container'>
      <div className="calculator">
        <CalculatorDisplay displayValue={display}/>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <CalculatorKey className="key-clear" label={ActionKeys.CLEAR} onPress={actionKeyPressHandler} />
              <CalculatorKey className="key-sign" label={ActionKeys.SIGN_FLIP} onPress={actionKeyPressHandler} />
              <CalculatorKey className="key-percent" label={OperatorKeys.SQRT} onPress={operatorKeyPressHandler} />
            </div>
            <div className="digit-keys">
              <CalculatorKey className="key-0" label={NumericKeys.ZERO} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-dot" label={ActionKeys.DOT} onPress={actionKeyPressHandler} />
              <CalculatorKey className="key-1" label={NumericKeys.ONE} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-2" label={NumericKeys.TWO} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-3" label={NumericKeys.THREE} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-4" label={NumericKeys.FOUR} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-5" label={NumericKeys.FIVE} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-6" label={NumericKeys.SIX} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-7" label={NumericKeys.SEVEN} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-8" label={NumericKeys.EIGHT} onPress={numericKeyPressHandler} />
              <CalculatorKey className="key-9" label={NumericKeys.NINE} onPress={numericKeyPressHandler} />
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="key-divide" label={OperatorKeys.DIV} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-multiply" label={OperatorKeys.MULT} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-subtract" label={OperatorKeys.MINUS} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-add" label={OperatorKeys.PLUS} onPress={operatorKeyPressHandler} />
            <CalculatorKey className="key-equals" label={ActionKeys.EQUALS} onPress={actionKeyPressHandler} />
          </div>
        </div>
      </div>
    </div>
  ) 
}