import { OperatorKeys } from '../enums';
import { IStateData } from '../interfaces';
import { StateData } from './state-data.model';

describe('models', (): void => {
  describe('StateDataModel', (): void => {

    describe('Builder', (): void => {

      describe('withFirstBuffer()', (): void => {

        it('should set the value of FirstBuffer on returned state object', (): void => {

          const expectedValue: IStateData = new StateData('first', '', '', <OperatorKeys>'', <OperatorKeys>'');

          const returnedValue: IStateData = new StateData.Builder()
            .withFirstBuffer('first')
            .build();

          expect(returnedValue).toEqual(expectedValue);

        });

      });

      describe('withSecondBuffer()', (): void => {

        it('should set the value of FirstBuffer on returned state object', (): void => {

          const expectedValue: IStateData = new StateData('', 'second', '', <OperatorKeys>'', <OperatorKeys>'');

          const returnedValue: IStateData = new StateData.Builder()
            .withSecondBuffer('second')
            .build();

          expect(returnedValue).toEqual(expectedValue);

        });

      });

      describe('withThirdBuffer()', (): void => {

        it('should set the value of FirstBuffer on returned state object', (): void => {

          const expectedValue: IStateData = new StateData('', '', 'third', <OperatorKeys>'', <OperatorKeys>'');

          const returnedValue: IStateData = new StateData.Builder()
            .withThirdBuffer('third')
            .build();

          expect(returnedValue).toEqual(expectedValue);

        });

      });

      describe('withFirstOperator()', (): void => {

        it('should set the value of FirstBuffer on returned state object', (): void => {

          const expectedValue: IStateData = new StateData('', '', '', <OperatorKeys>'op1', <OperatorKeys>'');

          const returnedValue: IStateData = new StateData.Builder()
            .withFirstOperator(<OperatorKeys>'op1')
            .build();

          expect(returnedValue).toEqual(expectedValue);

        });

      });

      describe('withSecondOperator()', (): void => {

        it('should set the value of FirstBuffer on returned state object', (): void => {

          const expectedValue: IStateData = new StateData('', '', '', <OperatorKeys>'', <OperatorKeys>'op2');

          const returnedValue: IStateData = new StateData.Builder()
            .withSecondOperator(<OperatorKeys>'op2')
            .build();

          expect(returnedValue).toEqual(expectedValue);

        });

      });

      describe('build()', (): void => {

        it('should return an empty state data object by default', (): void => {

          const expectedValue: IStateData = new StateData('', '', '', <OperatorKeys>'', <OperatorKeys>'');

          const returnedValue: IStateData = new StateData.Builder().build();

          expect(returnedValue).toEqual(expectedValue);

        });

        it('should persist values set by all builder methods', (): void => {

          const expectedValue: IStateData = new StateData('first', 'second', 'third', <OperatorKeys>'op1', <OperatorKeys>'op2');

          const returnedValue: IStateData = new StateData.Builder()
            .withFirstBuffer('first')
            .withSecondBuffer('second')
            .withThirdBuffer('third')
            .withFirstOperator(<OperatorKeys>'op1')
            .withSecondOperator(<OperatorKeys>'op2')
            .build();

          expect(returnedValue).toEqual(expectedValue);

        });


      });

    });

    describe('StateData', (): void => {

      let stateData: IStateData;

      beforeEach((): void => {
        stateData = new StateData('first', 'second', 'third', <OperatorKeys>'op1', <OperatorKeys>'op2');
      });

      describe('firstBuffer', (): void => {

        describe('getter()', (): void => {

          it('should return the value "first"', (): void => {
            expect(stateData.firstBuffer).toEqual('first');
          });

        });

        describe('setter()', (): void => {

          it('should update the value to "newValue"', (): void => {
            stateData.firstBuffer = 'newValue';
            expect(stateData.firstBuffer).toEqual('newValue');
          });

        });

      });

      describe('secondBuffer', (): void => {

        describe('getter()', (): void => {

          it('should return the value "second"', (): void => {
            expect(stateData.secondBuffer).toEqual('second');
          });

        });

        describe('setter()', (): void => {

          it('should update the value to "newValue"', (): void => {
            stateData.secondBuffer = 'newValue';
            expect(stateData.secondBuffer).toEqual('newValue');
          });

        });

      });

      describe('thirdBuffer', (): void => {

        describe('getter()', (): void => {

          it('should return the value "third"', (): void => {
            expect(stateData.thirdBuffer).toEqual('third');
          });

        });

        describe('setter()', (): void => {

          it('should update the value to "newValue"', (): void => {
            stateData.thirdBuffer = 'newValue';
            expect(stateData.thirdBuffer).toEqual('newValue');
          });

        });

      });

      describe('firstOperator', (): void => {

        describe('getter()', (): void => {

          it('should return the value "op1"', (): void => {
            expect(stateData.firstOperator).toEqual('op1');
          });

        });

        describe('setter()', (): void => {

          it('should update the value to "newValue"', (): void => {
            stateData.firstOperator = <OperatorKeys>'newValue';
            expect(stateData.firstOperator).toEqual('newValue');
          });

        });

      });

      describe('secondOperator', (): void => {

        describe('getter()', (): void => {

          it('should return the value "op2"', (): void => {
            expect(stateData.secondOperator).toEqual('op2');
          });

        });

        describe('setter()', (): void => {

          it('should update the value to "newValue"', (): void => {
            stateData.secondOperator = <OperatorKeys>'newValue';
            expect(stateData.secondOperator).toEqual('newValue');
          });

        });

      });

      describe('display()', (): void => {

        it('should return a concatenated string with alternate operators and operands from first to last', (): void => {
          expect(stateData.display()).toEqual('firstop1secondop2third');
        });

      });

    });

  });
});
