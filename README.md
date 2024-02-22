# Autocomplete component example

This project is an example of a autcomplete component that calls an API to show a suggestion list to the user.

## Tech stack

This project uses the folowing tech stack:

- [Vite](https://vitejs.dev) - As tooling to create the project environment.
- [ReactJS](https://reactjs.org) - To build the dynamic interface.
- [TypeScript](https://www.typescriptlang.org) - To ensure type safety.
- [Vitest](https://vitest.dev) - As the testing framework and runner.
- [Testing Library](https://testing-library.com) - Testing utilities to render the components.
- [Tailwindcss](https://tailwindcss.com) - To build the interface design.
- [Eslint](https://eslint.org) - To ensure code quality and standard
- [Json Server](https://github.com/typicode/json-server) - To mock the data and acts a backend server

## Installation

You will need [NodeJS](https://nodejs.org/en) at version 18 ou greather configured in your machine before proceding.

Clone the project, go to the root folder and run the following command:

`yarn install`

## Running the project in the local environment

### Running the mock REST API

This project uses [Json Server](https://github.com/typicode/json-server) to fake an API that is used by the applcation to show data.
To run this API you shold use the following command:

`yarn run:server`

### Running the application

To run the project in your local environment, after installing the dependencies. In the root folder, run the command:

`yarn dev`

The application should start and you should be able to access it at [http://localhost:5173](http://localhost:5173) in your browser.

## Creating a build for production

After installing the dependencies, In the root folder, run the command:

`yarn build`

The project build will be done and the files will be generated within the `/dist` folder
