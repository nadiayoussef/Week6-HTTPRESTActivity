
import { NumericKeys } from '../enums';
import { ICalculatorState, IContext, IStateData } from '../interfaces';
import { CalculatorModel } from '../models/calculator.model';
import { StateData } from '../models/state-data.model';
import { EnteringFirstNumberState } from './entering-first-number.state';
import { EnteringSecondNumberState } from './entering-second-number.state';

describe('states', (): void => {
  describe('EnteringSecondNumberState', (): void => {

    let enteringSecondNumberState: ICalculatorState;
    let calculatorModel: IContext;
    let stateData: IStateData;

    beforeEach((): void => {
      calculatorModel = new CalculatorModel();
      stateData = new StateData.Builder().build();
      enteringSecondNumberState = new EnteringSecondNumberState(calculatorModel, stateData);
    });

    afterEach((): void => {
      jest.clearAllMocks();
      enteringSecondNumberState = null;
      calculatorModel = null;
      stateData = null;
    });

    describe('digit()', (): void => {

      it('should replace firstBuffer with input if firstBuffer is 0', (): void => {

        (<any>enteringSecondNumberState)._data._secondBuffer = '0';

        enteringSecondNumberState.digit(NumericKeys.ONE);

        expect((<any>enteringSecondNumberState)._data._secondBuffer).toEqual('1');

      });

      it('should append the input digit to the firstBuffer if firstBuffer is not 0', (): void => {

        enteringSecondNumberState.digit(NumericKeys.ONE);

        expect((<any>enteringSecondNumberState)._data._secondBuffer).toEqual('1');

      });

    });

    describe('decimalSeparator()', (): void => {

      it('should add a decimal point to firstBuffer if the buffer is currently empty', (): void => {

        enteringSecondNumberState.decimalSeparator();

        expect((<any>enteringSecondNumberState)._data._secondBuffer).toEqual('.');

      });

      it('should add a decimal point at the end of firstBuffer if the buffer is not empty', (): void => {

        (<any>enteringSecondNumberState)._data._secondBuffer = '12';

        enteringSecondNumberState.decimalSeparator();

        expect((<any>enteringSecondNumberState)._data._secondBuffer).toEqual('12.');

      });

      it('should do nothing if firstBuffer already contains a decinal point', (): void => {

        (<any>enteringSecondNumberState)._data._secondBuffer = '12.34';

        enteringSecondNumberState.decimalSeparator();

        expect((<any>enteringSecondNumberState)._data._secondBuffer).toEqual('12.34');

      });

    });

    describe('binaryOperator()', (): void => {
      it.todo('should do something');
    });

    describe('equals()', (): void => {
      it.todo('should do something');
    });

    describe('clear()', (): void => {

      it('should transition to EnteringFirstNumberState with empty state', (): void => {

        const expectedState: ICalculatorState = new EnteringFirstNumberState(calculatorModel, new StateData.Builder().build());
        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null);

        enteringSecondNumberState.clear();

        expect(calculatorModel.changeState)
          .toHaveBeenCalledWith(expectedState);

      });

    });

    describe('display()', (): void => {

      it('should call through to state.display()', (): void => {

        jest.spyOn(stateData, 'display').mockReturnValue('displayValue');

        enteringSecondNumberState.display();

        expect(stateData.display).toHaveBeenCalledWith();

      });

      it('should call return the value returned by state.display()', (): void => {

        jest.spyOn(stateData, 'display').mockReturnValue('displayValue');

        const returnedValue: string = enteringSecondNumberState.display();

        expect(returnedValue).toEqual('displayValue');

      });

    });

  });
});
