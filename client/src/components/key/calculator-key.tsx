
import React from 'react';
import { OperatorKeys } from '../../enums/operator-keys.enum';
import { NumericKeys } from '../../enums/numeric-keys.enum';
import { ActionKeys } from '../../enums/action-keys.enum';

interface IProps {
  onPress(key: NumericKeys | OperatorKeys | ActionKeys): void;
  label: NumericKeys | OperatorKeys | ActionKeys;
  className: string;
}

export function CalculatorKey(props: IProps) {
  return <button className={`calculator-key ${props.className}`}  onClick={() => { props.onPress(props.label) }}>{props.label}</button>;         
}
