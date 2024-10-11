/* eslint-disable max-len */

import { CalculatorModel } from './calculator.model';
import { ICalculatorModel, ICalculatorState, IContext } from '../interfaces';
import { ActionKeys, NumericKeys, OperatorKeys } from '../enums';
import { EnteringFirstNumberState, EnteringSecondNumberState } from '../states';

jest.mock('../states/entering-second-number.state');

describe('models', (): void => {
  describe('CalculatorModel', (): void => {

    let calculatorModel: ICalculatorModel | IContext;

    beforeEach((): void => {
      calculatorModel = new CalculatorModel();
    });

    afterEach((): void => {
      jest.clearAllMocks();
    });

    describe('initialization()', (): void => {

      it('should set the default state as EnteringFirstNumberState', (): void => {

        expect((<any>calculatorModel)['_state']).toBeInstanceOf(EnteringFirstNumberState);

      });

    });

    describe('changeState()', (): void => {

      it('should update the state of the class with provided state', (): void => {

        const mockState: ICalculatorState = new EnteringSecondNumberState(<IContext>calculatorModel, <any>{});

        (<IContext>calculatorModel).changeState(mockState);

        expect((<any>calculatorModel)['_state']).toEqual(mockState);

      });

    });

    describe('pressNumericKey()', (): void => {

      let digitStub: jest.SpyInstance;
      beforeEach((): void => {
        digitStub = jest.spyOn(<unknown>EnteringFirstNumberState.prototype as ICalculatorState, 'digit').mockReturnValue(null);
      });

      it('should invoke state.digit() with input key', (): void => {

        (<ICalculatorModel>calculatorModel).pressNumericKey(NumericKeys.ONE);

        expect(digitStub).toHaveBeenLastCalledWith(NumericKeys.ONE);

      });

    });

    describe('pressOperatorKey()', (): void => {

      let binaryOperatorStub: jest.SpyInstance;
      beforeEach((): void => {
        binaryOperatorStub = jest.spyOn(<unknown>EnteringFirstNumberState.prototype as ICalculatorState, 'binaryOperator')
          .mockReturnValue(null);
      });

      it('should invoke state.binaryOperator() with input key', (): void => {

        (<ICalculatorModel>calculatorModel).pressOperatorKey(OperatorKeys.PLUS);

        expect(binaryOperatorStub).toHaveBeenLastCalledWith(OperatorKeys.PLUS);

      });

    });

    describe('pressActionKey()', (): void => {

      it('should invoke state.clear() when the CLEAR key is pressed', (): void => {

        const clearStub: jest.SpyInstance = jest.spyOn(<unknown>EnteringFirstNumberState.prototype as ICalculatorState, 'clear')
          .mockReturnValue(null);

        (<ICalculatorModel>calculatorModel).pressActionKey(ActionKeys.CLEAR);

        expect(clearStub).toHaveBeenLastCalledWith();

      });

      it('should invoke state.decimalSeparator() when the DOT key is pressed', (): void => {

        const decimalSeparatorStub: jest.SpyInstance = jest.spyOn(<unknown>EnteringFirstNumberState.prototype as ICalculatorState, 'decimalSeparator')
          .mockReturnValue(null);

        (<ICalculatorModel>calculatorModel).pressActionKey(ActionKeys.DOT);

        expect(decimalSeparatorStub).toHaveBeenLastCalledWith();

      });

      it('should invoke state.equals() when the EQUALS key is pressed', (): void => {

        const equalsStub: jest.SpyInstance = jest.spyOn(<unknown>EnteringFirstNumberState.prototype as ICalculatorState, 'equals')
          .mockReturnValue(null);

        (<ICalculatorModel>calculatorModel).pressActionKey(ActionKeys.EQUALS);

        expect(equalsStub).toHaveBeenLastCalledWith();

      });

      it('should throw an "Invalid Action" error if any other key is input', (): void => {

        expect((): void => {
          (<ICalculatorModel>calculatorModel).pressActionKey(<any>'');
        }).toThrowError('Invalid Action');

      });

    });

    describe('display()', (): void => {

      let displayStub: jest.SpyInstance;
      beforeEach((): void => {
        displayStub = jest.spyOn(<unknown>EnteringFirstNumberState.prototype as ICalculatorState, 'display')
          .mockReturnValue('display value');
      });

      it('should invoke state.display() and return the value', (): void => {

        const returnedValue: string = (<ICalculatorModel>calculatorModel).display();

        expect(displayStub).toHaveBeenLastCalledWith();
        expect(returnedValue).toEqual('display value');

      });

    });

  });
});
