# StudyBuddy
StudyBuddy is a full-stack MERN web app that allows users to create study sets using flashcards.
Link to public repo: https://github.com/wandagb/StudyBuddy

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Setup](#setup)
4. [Authors](#authors)

## Features
- **User Authentification**
  - Create an account to start making study sets
- **Creating sets of flashcards**
  - Add sets to your library and add/remove flashcards to your sets
  - You must sign up or log in to create!
- **Explore page**
  - View other user's sets
- **Comment system**
  - Post and view comments on a set
- **Search Feature**
  - Search for study sets using the built-in search feature

## Technologies
 - Javascript <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="javascript" width="30px">
 - Node.js <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="node.js" width="30px">
 - React.js <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="react.js" width="30px">
 - Express.js <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" height="30px">
 - MongoDB <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/MongoDB_Logo.png/1598px-MongoDB_Logo.png?20180423174357" alt="MongoDB" height="30px">

## Setup
First, clone or download this repository.
Second, create a `.env` file in the StudyBuddy/server directory. The `.env` file should contain:
```
DB_URI=
PORT=4000
SECRET=
```
For the database key (DB_URI) please email: studybuddycs35L@gmail.com

You can make SECRET anything you'd like. Ex: ILoveCS35L

Execute the build script that initializes the client and server in the terminal:
```bash
./build.sh
```

**Note**: If you are running into file permission issues execute the sudoBuild script in terminal:
```bash
./sudoBuild.sh
```

**Note**: If you are on Windows you have to run the scripts in a git bash shell not in Windows PowerShell.

If both scripts do not work you can manually initialize the client and server by running the following commands:
```bash
cd StudyBuddy
cd client
npm install
npm start
# open a new terminal window
cd StudyBuddy
cd server
npm install
npm start
```

## Authors
**Contributors**

Wanda: Backend APIs

Andrew: Backend User Authentication

Mark: Frontend Forms and Pages

Ted: Frontend Flashcards/Sets

Hugo: Frontend Comment System


StudyBuddy was created as a project for CS 35L taught by Professor Paul Eggert at UCLA in Winter 2024.
