
# Koneksa Coding Challenge

## Overview of the Provided Project Files

* The `seed` folder in the backend contains a starting set of data for the database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create the app's database and populate it with data

* The `app.js` file configures Express to serve a simple REST API. The `morgan` npm package has been included to log HTTP requests/responses to the console.

* The `nodemon.js` file configures the nodemon Node.js module.

* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.

## Getting Started

To get up and running with this project, run the following commands from the root of the backend and frontend folder.

First, install the project's backend dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database in the backend folder.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the application please start the server and then start the React app by taking the following commands:

Install the React dependencies using `npm`.

```
npm install
```

Second, start the application.

```
npm start
```

Start http://localhost:3000 and try out the application!