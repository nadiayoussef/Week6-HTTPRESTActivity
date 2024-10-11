
import { resolve } from 'path';

class Routes {
  public static readonly WILDCARD: string = '*';
  public static readonly STATIC: string = '/';
  public static readonly API: string = '/api';
  public static readonly CALCULATOR: string = '/calculator';
}

export class ServerConfig {

  public static readonly HOST: string = 'localhost';
  public static readonly PORT: number = 9000;
  public static readonly ROUTES: typeof Routes = Routes;
  public static readonly STATIC_RESOURCE_DIR: string = resolve(__dirname, 'public');

}
