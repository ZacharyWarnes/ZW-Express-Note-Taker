const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json');

const PORT = process.env.port || 3001;

//use express to initialize the 'app' server
const app = express();

//Middleware for parsing JSON and url-encoding form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('api/notes', (req,res) => {
  console.info(`${req.method} request received for notes`)
  readFromFile('db').then((data)=> res.json(JSON.parse(data)));
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

//Using app to listen to designated PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
