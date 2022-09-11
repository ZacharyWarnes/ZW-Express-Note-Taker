//require Express
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

//require the db.json file and store it in 'notes'

//use express to initialize the 'app' server

//GET /notes should return the notes.html file.

//Get * should return the index.html file

//GET /api/notes should read the db.json file and return all saved notes as JSON.

    // 
    // res.json()

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

//Use the 'app' to listen to a specific 'PORT'
