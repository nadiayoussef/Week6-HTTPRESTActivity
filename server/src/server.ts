
import bodyParser = require('body-parser');
import express, { Express, NextFunction, Request, Response } from 'express';
import { ServerConfig } from './config/server.config';
import { CalculatorRoutes } from './api';

export class Server {

  private static _instance: Server;
  private app: Express;

  private constructor() {
    this.app = express();
    this.configureExpress();
    this.registerRoutes();
  }

  public static instance(): Server {
    if (!this._instance) {
      this._instance = new Server();
    }
    return this._instance;
  }

  public start(): void {
    this.app.listen(ServerConfig.PORT, ServerConfig.HOST, (): void => {
      console.log(`Calculator app listening on ${ServerConfig.HOST}:${ServerConfig.PORT}/`);
    });
  }

  private configureExpress(): void {
    this.app.use(function(req: Request, res: Response, next: NextFunction): void {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(express.static(ServerConfig.STATIC_RESOURCE_DIR));
  }

  private registerRoutes(): void {
    this.app.use(ServerConfig.ROUTES.API, CalculatorRoutes.instance().router);
    this.app.get(ServerConfig.ROUTES.STATIC, (req: Request, res: Response): void => {
      res.sendFile(ServerConfig.STATIC_RESOURCE_DIR + '/index.html');
    });
    this.app.all(ServerConfig.ROUTES.WILDCARD, (req: Request, res: Response): void => {
      res.status(404).send('Not Found');
    });
  }

}
