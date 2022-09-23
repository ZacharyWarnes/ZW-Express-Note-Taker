const express = require('express');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const notesRouter = express.Router();
const db = require('./db/db.json');


//GET /api/notes should read the db.json file and return all saved notes as JSON.
notesRouter.get('api/notes', (req,res) => {
    console.info(`${req.method} request received for notes`)
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)));
  });
  
  //POST Route for submitting note
  notesRouter.post('api/notes', (req,res) => {
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
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
        res.json(`note added successfully`);
    } else {
        res.error('Error adding note')
    } 
});
  

module.exports = notesRouter;