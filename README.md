# Getting Started with Create React App and learn

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## How to run front end 

move inside app folder and run below command 
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running Tests
There are 4 types of test are implemented in the App
1. Unit tests
2. Snapshot tests
3. API tests
4. End to end tests

### Running all test types
All the above mentioned tests can be executed with the command below inside app folder. (will auto generate and serve allure reports after end to end test execution)

`npm test`

### Running Unit Tests and Snapshot tests
Both of these tests will run together. Can run all unit tests + snapshot tests with command below inside `/app` folder

`npm run test:frontend`

Test coverage can be retrieved with the command below

`npm run coverage`

### Running API tests
Can run all api tests in the application with command below inside `/app` folder

`npm run test:api`

### Running End to End tests
All end to end tests in the application are implemented with WebdriverIO can be executed with command below inside `/app` folder

`npm run test:e2e`

End to end test results can be generated through Allure HTML reporting with the command below.

`npm run allure-generate`

Note: This report will auto generated and served locally after executing end to end testing. Report will be opened in a browser tab automatically. If you want to get the allure served url read the end of terminal log


## How to run server  
move inside server folder and run below command 

### `npm start`
