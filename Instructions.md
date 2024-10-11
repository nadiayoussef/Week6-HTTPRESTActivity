
# Week 9 HTTP/REST Activity

In this activity, we will split the calculator into two parts: client and server.
The client will contain the view for the Calculator (The React implementation from week 4).
The CalculatorModel, however, will now be moved to a NodeJS (express) server.

*Note*: A similar set-up could be used to implement collaborative editing in your final project.

## The Task
 - Update the routes on the server to invoke appropriate methods on the Calculator Model and return the display contents.
 - Update the client to make http requests for every key press to the server using axios.

## Before We Start

Run `npm install` at the root of the project.
The root in this case is the directory which contains the `package.json` along with the `client` and `server` directories.

*Note*: This starter is slightly different from what you are used to. Both server and client also have a `package.json` so make sure you run the commands in the right directory.

## Understanding The Code

### Client

The code for the React client is present in the `client` directory.
This is the same React app from Week 4 and you should be familiar with the structure. 
There is one additional directory (`src/utils`) in which we will implement an http util to make REST calls.
We will then use this *HttpUtil* in `src/Calculator.tsx` to make requests to the server.

tldr; We care about 2 files:
 - `src/utils/http.util.ts`
 - `src/calculator.tsx`

### Server

The code for the Express server is present in the `server` directory.
The code for the most part is similar to the STS generated scaffold you are familiar with from the Week 5 State Design Pattern activity.
In addition to the calculator that we are familiar with, there are a few more files and directories related to Express.
Below is a quick description of files related to the Express server:
 - `src/index.ts`: Starts the express server.
 - `src/server.ts`: Configures the Express server by setting up middleware and registering routes.
 - `src/api`: Directory containing the routes and associated controllers for our server.
   - `src/api/controllers/calculator.controller.ts`: Server side logic for handling REST calls on the `/api/calculator` endpoint. We will implement code here.
   - `src/api/routes/calculator.route.ts`: Binds the methods from the controller to actual routes.
 - `src/config`: Contains the config for the server such as the host, port, and routes.
 - `src/interfaces/request-body`: Type signature for data sent by the client on every key-press in the calculator app.

tldr; We care about 1 file:
 - `src/api/controllers/calculator.controller.ts`


## Implementing the Server

Go to the file `server/src/api/controller/calculator.controller.ts`.
You should see the code below:

```typescript
export class CalculatorController {

  public static getHandler(req: Request, res: Response): void {
    res.status(500).json('Internal Server Error');
  }

  public static postHandler(req: Request, res: Response): void {
    res.status(500).json('Internal Server Error');
  }

  public static allHandler(req: Request, res: Response): void {
    res.status(404).json('Not Found');
  }

}
```

We need to implement the get and post handlers here.
Before we actually update the handlers, let us create an instance of the calculator model in the class.

Add the following static property to the CalculatorController class:

```typescript
private static calculatorModel: ICalculatorModel = new CalculatorModel();
```

### Get Handler

Next, let us update the getHandler to return the display value of the calculator.
We can do so by replacing the existing code with the snippet below:

```typescript
public static getHandler(req: Request, res: Response): void {
  res.status(200).json(CalculatorController.calculatorModel.display());
}
```

The express server will return a response code of 200 with the current value of the display as the data.

### Post Handler

Next, we need to implement the actual logic for handling key presses on the client.
To do so, we need to update postHandler. 

First, extract the body from the request as below:

```typescript
const body: RequestBody = req.body;
```

The signature for RequestBody tells us which type of key was pressed and what the actual value was:
```typescript
export interface RequestBody {
  operationType: 'NumericKeys' | 'OperatorKeys' | 'ActionKeys';
  value: NumericKeys | OperatorKeys | ActionKeys;
}
```

We can use this information to invoke the appropriate method on our CalculatorModel.
Add the switch case below and implement the necessary methods:

```typescript
switch (body.operationType) {
  case 'NumericKeys':
    CalculatorController.calculatorModel.pressNumericKey(<NumericKeys>body.value);
    break;
  case 'OperatorKeys':
    // Implement this
    break;
  case 'ActionKeys':
    // Implement this
    break;
  default:
    res.status(500).json('ERR');
    return;
}
```

*Note*: In the default case, we send a 500 response and return from the method.
However, we have not sent a response for any of the other cases.

Once the appropriate method has been invoked on the calculator model, we can send the updated display value as the respose after the switch case.

```typescript
res.status(200).json(CalculatorController.calculatorModel.display());
```

The rest of the wiring for Express is already done and our server is now ready!

*Note*: Please reach out or drop into office hours if you want to understand the set-up in more detail.

## Implementing The Client

Now that the server is ready, let us implement the necessary methods on the client to communicate with the server.

### Setting Up HttpUtil

Let us start by Implementing HttpUtil in `client/src/utils/http.util.ts`.
You should the code below:

```typescript
import axios, { Axios, AxiosResponse } from 'axios';

export class HttpUtil {

  private _axios: Axios;

}
```

First, add a constructor to the util which takes an the baseUrl as an argument.
We can configure axios with a default base url parameter which will be prepended to all requests.
Add the code below to the class:

```typescript
constructor(baseURL: string) {
  this._axios = axios.create({
    baseURL: baseURL
  });
}
```

Next, we need to implement 2 methods:
 - getRequest()
 - postRequest()

Create a signature for getRequest() as below:

```typescript
public async getRequest<T>(): Promise<T> { }
```

This method accepts a generic (T) from the caller and returns a promise of type T.
In our case, the server returns a string.

To make a get request using axios, we simply invoke the method:
```typescript
this._axios.get<AxiosResponse<T>>('');
```

This will make a get request to the server and get the response as a Promise.

Finally, we need to unwrap the Promise to extract the data.
The completed method should look as below:

```typescript
public async getRequest<T>(): Promise<T> {
    const response: AxiosResponse = await this._axios.get('');
    return response.data;
}
```

Next, we need to implement the postRequest method with the below signature:

```typescript
public async postRequest<S, T>(requestBody: T): Promise<S> { }
```

This method accepts a generic request body (T) and returns a generic Promise (S).
To make a post request with a body, we use the below syntax:

```typescript
this._axios.post<AxiosResponse<S>>('', requestBody)
```
Complete the implement similar to the getRequest method before moving on.

### Using HttpUtil

Let us implement the code for using the HttpUtil to get data from the server in `client/src/calculator.tsx`.

In calculator.tsx, start by creating an instance of the HttpUtil outside the Calculator class as below:

```typescript
const httpUtil: HttpUtil = new HttpUtil('/api/calculator');
```

Next, we will use the `useEffect` hook to make a get request to the server to fetch the state of the calculatorModel when the component first loads.
We can do this by adding the code below to the Calculator component:

```typescript
useEffect(() => {  
  httpUtil.getRequest<string>()
  .then((displayValue: string) => {
    setDisplay(displayValue);
  })
}, []);
```

Next, we need to implement the methods to make post requests to the server with the information about the key pressed.
Let us start with the `numericKeyPressHandler()` method.

We can make a post request to the server using the httpUtil as below:

```typescript
const numericKeyPressHandler = async (key: NumericKeys): Promise<void> => {
  httpUtil.postRequest<string, RequestBody>({ operationType: 'NumericKeys', value: key });
}
```

Next, we need to get the updated display value and update the state in React.
We can do this as below:

```typescript
const numericKeyPressHandler = async (key: NumericKeys): Promise<void> => {
  const displayValue = await httpUtil.postRequest<string, RequestBody>({ operationType: 'NumericKeys', value: key });
  setDisplay(displayValue);
}
```

Similarly complete the implementation for OperatorKeys and ActionKeys.

## Running The Application

Once the implementation is complete, we can run the client and server together to see things in action.
Make sure you're at the root of the project.
- Run `npm install` if you haven't already.
- Run `npm run start`.

A local express server (which also serves the React App) will start on port 9000.
Open a browser and navigate to `http://localhost:9000`.
The Calculator App should be running.

## Submission

Run `npm run zip` and submit the `submission.zip` to gradescope.
