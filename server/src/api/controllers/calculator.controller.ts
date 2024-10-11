
import { Request, Response } from 'express';
import { CalculatorModel } from '../../models/calculator.model';
import { ICalculatorModel, RequestBody } from '../../interfaces';
import { ActionKeys, NumericKeys, OperatorKeys } from '../../enums';

export class CalculatorController {

  public static getHandler(req: Request, res: Response<string>): void {
    res.status(500).json('Internal Server Error');
  }

  public static postHandler(req: Request<RequestBody>, res: Response<string>): void {
    res.status(500).json('Internal Server Error');
  }

  public static allHandler(req: Request, res: Response): void {
    res.status(404).json('Not Found');
  }

}
