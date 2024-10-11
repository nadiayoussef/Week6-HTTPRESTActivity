import { Router } from 'express';
import { ServerConfig } from '../../config/server.config';
import { CalculatorController } from '../controllers/calculator.controller';

export class CalculatorRoutes {

  private static _instance: CalculatorRoutes;
  private _router: Router;

  private constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  public get router(): Router {
    return this._router;
  }

  public static instance(): CalculatorRoutes {
    if (!CalculatorRoutes._instance) {
      CalculatorRoutes._instance = new CalculatorRoutes();
    }
    return CalculatorRoutes._instance;
  }

  private configureRoutes(): void {
    this._router.get(ServerConfig.ROUTES.CALCULATOR, CalculatorController.getHandler);
    this._router.post(ServerConfig.ROUTES.CALCULATOR, CalculatorController.postHandler);
    this._router.all(ServerConfig.ROUTES.CALCULATOR, CalculatorController.allHandler);
  }

}
