import { NumericKeys } from '../enums';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { EnteringFirstNumberState } from './entering-first-number.state';
import { EnteringSecondNumberState } from './entering-second-number.state';
import { ErrorState } from './error.state';

export class EnteringThirdNumberState implements ICalculatorState {
  public constructor(private _context: IContext, private _data: IStateData) {}

  public digit(digit: NumericKeys): void {
    this._data.thirdBuffer =
      this._data.thirdBuffer === '0' ? digit : this._data.thirdBuffer + digit;
  }

  public decimalSeparator(): void {
    if (this._data.thirdBuffer.indexOf('.') === -1) {
      // ignore if the number already has a decimal separator
      this._data.thirdBuffer += '.';
    }
  }

  public binaryOperator(operator: OperatorKeys): void {
    // evaluate the entire expression and transition to EnteringSecondNumberState
    // (or ErrorState in case of division by zero)
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );
    const thirdNumber: number = parseFloat(
      this._data.thirdBuffer === '' ? '0' : this._data.thirdBuffer
    );

    let result: number;

    switch (operator) {
      case OperatorKeys.MULT:
        result = secondNumber * thirdNumber;
        this._data.secondBuffer = result.toString();
        this._data.thirdBuffer = '';
        break;
      case OperatorKeys.DIV:
        if (thirdNumber === 0) {
          this._context.changeState(new ErrorState(this._context, this._data));
        } else {
          result = secondNumber / thirdNumber;
          this._data.secondBuffer = result.toString();
          this._data.thirdBuffer = '';
        }
        break;
      case OperatorKeys.PLUS:
      case OperatorKeys.MINUS:
        this.evaluateWhenLowPrecedenceNext(operator);
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
  }

  public equals(): void {
    // evaluate the entire expression and transition to EnteringFirstNumberState
    // (or ErrorState in case of division by zero)
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );
    const thirdNumber: number = parseFloat(
      this._data.thirdBuffer === '' ? '0' : this._data.thirdBuffer
    );
    let result: number;

    if (this._data.secondOperator === OperatorKeys.MULT) {
      result = secondNumber * thirdNumber;
    } else {
      // (this._data.secondOperator === OperatorKeys.DIV)
      if (thirdNumber === 0) {
        this._context.changeState(new ErrorState(this._context, this._data));
        return;
      } else {
        result = secondNumber / thirdNumber;
      }
    }

    if (this._data.firstOperator === OperatorKeys.PLUS) {
      this._context.changeState(
        new EnteringFirstNumberState(
          this._context,
          new StateData.Builder().withFirstBuffer((firstNumber + result).toString()).build()
        )
      );
    } else {
      // (this._data.firstOperator === OperatorKeys.MINUS)
      this._context.changeState(
        new EnteringFirstNumberState(
          this._context,
          new StateData.Builder().withFirstBuffer((firstNumber - result).toString()).build()
        )
      );
    }
  }

  public clear(): void {
    this._context.changeState(
      new EnteringFirstNumberState(this._context, new StateData.Builder().build())
    );
  }

  public display(): string {
    return this._data.display();
  }

  private evaluateWhenLowPrecedenceNext(nextOperator: OperatorKeys): void {
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );
    const thirdNumber: number = parseFloat(
      this._data.thirdBuffer === '' ? '0' : this._data.thirdBuffer
    );

    let result: number;
    let newData: IStateData;

    switch (this._data.secondOperator) {
      case OperatorKeys.MULT:
        result = secondNumber * thirdNumber;
        if (this._data.firstOperator === OperatorKeys.PLUS) {
          result = firstNumber + result;
        } else {
          // (this._data.firstOperator === OperatorKeys.MINUS)
          result = firstNumber - result;
        }
        newData = new StateData.Builder()
          .withFirstBuffer(result.toString())
          .withFirstOperator(nextOperator)
          .build();
        this._context.changeState(new EnteringSecondNumberState(this._context, newData));
        break;
      case OperatorKeys.DIV:
        if (thirdNumber !== 0) {
          result = secondNumber / thirdNumber;
          if (this._data.firstOperator === OperatorKeys.PLUS) {
            result = firstNumber + result;
          } else {
            // (this._data.firstOperator === OperatorKeys.MINUS)
            result = firstNumber - result;
          }
          newData = new StateData.Builder()
            .withFirstBuffer(result.toString())
            .withFirstOperator(nextOperator)
            .build();
          this._context.changeState(new EnteringSecondNumberState(this._context, newData));
        } else {
          this._context.changeState(new ErrorState(this._context, this._data));
        }
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
  }
}
