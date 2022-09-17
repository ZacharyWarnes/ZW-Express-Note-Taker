const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');




const PORT = process.env.port || 3001;


//require the db.json file and store it in 'notes'

//use express to initialize the 'app' server
const app = express();

//Get * should return the index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET /api/notes should read the db.json file and return all saved notes as JSON.

    // 
    // res.json()

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

//Use the 'app' to listen to a specific 'PORT'
