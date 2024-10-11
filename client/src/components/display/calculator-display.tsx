
interface IProps {
  displayValue: string;
}

export function CalculatorDisplay(props: IProps) {
  const value = props.displayValue || '0';
  return <div className="calculator-display">{value}</div>;
}
