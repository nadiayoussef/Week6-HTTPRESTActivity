import { NumericKeys, OperatorKeys } from '../enums';
import { ICalculatorState, IContext, IStateData } from '../interfaces';
import { CalculatorModel } from '../models/calculator.model';
import { StateData } from '../models/state-data.model';
import { EnteringFirstNumberState } from './entering-first-number.state';
import { ErrorState } from './error.state';

describe('states', (): void => {
  describe('ErrorState', (): void => {

    let errorState: ICalculatorState;
    let calculatorModel: IContext;
    let stateData: IStateData;

    beforeEach((): void => {
      calculatorModel = new CalculatorModel();
      stateData = new StateData.Builder().build();
      errorState = new ErrorState(calculatorModel, stateData);
    });

    afterEach((): void => {
      jest.clearAllMocks();
      errorState = null;
      calculatorModel = null;
      stateData = null;
    });

    describe('digit()', (): void => {

      it('should transition to the EnteringFirstNumberState with the input key in firstBuffer', (): void => {

        const mockData: IStateData = new StateData.Builder().withFirstBuffer(NumericKeys.ONE).build();
        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null);

        errorState.digit(NumericKeys.ONE);

        expect(calculatorModel.changeState).toHaveBeenCalledWith(new EnteringFirstNumberState(calculatorModel, mockData));

      });

    });

    describe('decimalSeparator()', (): void => {

      it('should transition to the EnteringFirstNumberState with "0." firstBuffer', (): void => {

        const mockData: IStateData = new StateData.Builder().withFirstBuffer('0.').build();
        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null);

        errorState.decimalSeparator();

        expect(calculatorModel.changeState).toHaveBeenCalledWith(new EnteringFirstNumberState(calculatorModel, mockData));

      });

    });

    describe('binaryOperator()', (): void => {

      it('should remain in the ErrorState', (): void => {

        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null);

        errorState.binaryOperator(OperatorKeys.PLUS);

        expect(calculatorModel.changeState).toHaveBeenCalledWith(new ErrorState(calculatorModel, stateData));

      });

    });

    describe('equals()', (): void => {

      it('should remain in the ErrorState', (): void => {

        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null);

        errorState.equals();

        expect(calculatorModel.changeState).toHaveBeenCalledWith(new ErrorState(calculatorModel, stateData));

      });

    });

    describe('clear()', (): void => {

      it('should transition to the EnteringFirstNumberState with an empty state', (): void => {

        const mockData: IStateData = new StateData.Builder().build();
        jest.spyOn(calculatorModel, 'changeState').mockReturnValue(null);

        errorState.clear();

        expect(calculatorModel.changeState).toHaveBeenCalledWith(new EnteringFirstNumberState(calculatorModel, mockData));

      });

    });


    describe('display()', (): void => {

      it('should return the string "ERR"', (): void => {

        expect(errorState.display()).toEqual('ERR');

      });

    });

  });
});
