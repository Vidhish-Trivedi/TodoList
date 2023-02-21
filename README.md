# Todo List Web App
#### - A simple web app which allows a user to create and manage multiple Todo lists and save data persistently using MongoDB.

## Features
---
- A default list displayed to the user on the root route corresponding to the day.
- The application will create routes on the fly, allowing the user to create multiple lists on different routes such as "/home", "/work", "/", etc.
- The user can delete a completed task using the checkbox next to it.
- The user can add a new task using the + button.

## Tech
---
- NodeJS
- Express and EJS
- MongoDB with Mongoose
- HTML, CSS, JS, and other commonly used libraries

## How To Use
---
- Clone this repository
- Install the dependencies.
```sh
cd TodoList
npm i
```
- Run
```sh
node app.js
```
- Go to http://localhost:3000 to access the root route.
- To create a new list, go to http://localhost:3000/<list_name>
- Note that inorder for the app to work as intended, the user must have a MongoDB server running on port 27017 on localhost, or alternatively, make appropriate changes to the code.
