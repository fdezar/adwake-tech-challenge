# Football API Full Stack App

This repository contains the code for Football API, a full-stack application built using MongoDB, Node, Angular and Typescript.

## Train of thought and decision making 🧠

For this project, I chose MongoDB as the database due to its flexibility in handling complex, nested data structures such as players, teams, and leagues. Since football data can have hierarchical relationships (leagues containing teams, teams containing players), MongoDB’s document-oriented NoSQL model allows for easy storage and retrieval of this data without complex joins. Additionally, MongoDB scales easily, which is important for potential future expansion where more leagues, teams, and players could be added. Mongoose also helps us with the data relationships.

I always approach any project from a backend-first perspective. This means I see the backend as the fundamental foundation, and that implies developing it first before the client-side. The first thing I did in this case was to look for a model to structure the backend, identify the dependencies I might need, and from there, create the folder structure and install all the necessary dependencies.

Once the dependencies are installed, I usually tackle the server configuration and the models. I first make sure I have a clear understanding of what the database structure will look like, define it, and establish the relationships. This makes it easier for me to handle the routing system, as having the entire model system in place allows me to work on the routes, directly pointing to the specific models.

To test the routes, I always use Postman. Postman allows me to test routes without needing a frontend, which simplifies my work as a developer. I ensure that the routes work, and if they don’t, I usually check either the browser console or the terminal to see if there are any errors. I first try to fix them on my own, but if I can’t find the solution, I search for it online by copying and pasting the error or purely using my intuition.

Once I’m sure that the entire backend works perfectly, I move on to the frontend. In this case, Angular is a framework I had never worked with before, although I am more specialized in React. So my strategy has been to try to understand how to write the logic that I already know from React, in Angular. That is, how to create components, set up routing, apply JavaScript functions in the code, among other things. It’s worth mentioning that within the timeframe given for this project, it’s naturally very difficult to learn Angular from scratch. So instead of trying to learn all of Angular, I focused on learning the specific parts of Angular that this project required due to time constraints.

I hope this project demonstrates what I consider to be one of my strongest points: my adaptability and my ability to learn. Thank you very much.

## Features 💡

Front End

- League Selector functionality
- View league teams
- View league players

Back End

- API endpoints for Football API requests
- MongoDB database for storing API data
- Mongoose models for defining data structures

## Technologies Used 💻

Front End

- Angular: JavaScript framework for building user interfaces
- Typescript: Programming language that adds static typing to JavaScript

Back End

- Node.js: JavaScript runtime for building server-side applications
- Express: Web application framework for Node.js
- MongoDB: NoSQL database for storing data
- Mongoose: MongoDB object modeling tool for Node.js
- Typescript: Programming language that adds static typing to JavaScript

## Getting Started 🚀

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. On the Server carpet, create a `.env` file and fill in the necessary environment variables (MONGODB_URI, FOOTBALL_API_KEY, PORT).
5. Start the server part using `npm run dev` and the client part using `ng serve`.

## License 📝

This project is licensed under the MIT License.