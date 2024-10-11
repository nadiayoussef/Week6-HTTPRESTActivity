import { ActionKeys, NumericKeys, OperatorKeys } from '../enums';

export interface RequestBody {
  operationType: 'NumericKeys' | 'OperatorKeys' | 'ActionKeys';
  value: NumericKeys | OperatorKeys | ActionKeys;
}
