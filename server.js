const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json');
const { v4: uuidv4 } =require('uuid');

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

//POST Route for submitting note
app.post('api/notes', (req,res) => {
  //POST note request rec
  console.info(`${req.method} request received to post note`);

  //Destructing assignment for the items in req.body
  const { text, title } = req.body;

  //If all the required properties are present
  if (text && title) {
    //Variable for the object to save
    const newNote = {
      text,
      title,
      note_id: uuidv4()
    };

    readAndAppend(newNote, 'db');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error posting note')
  }
});

//Using app to listen to designated PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
