const express = require('express');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const notesRouter = express.Router();
const db = require('../db/db.json');


// GET Route
notesRouter.get('/', (req,res) => {
    res.json(db);
  });
  
  //POST Route for submitting note
  notesRouter.post('/', (req,res) => {
    console.log(req.body);
  
    //Destructing assignment for the items in req.body
    const { text, title } = req.body;
  
    //If all the required properties are present
    if (text && title) {
      //Variable for the object to save
      const newNote = {
        text,
        title,
        note_id: uuid(),
      }
      
    //push newNote to empty array in db.json
      db.push(newNote);

    fs.writeFile('../db/db.json', JSON.stringify(db, null, 4), error => {
      if (error) {
        res.status(500).json('Could not save note');
      } else {
        
        //success response
        const response = {
          status: 200,
          statusText: 'Note added',
          ok: true,
          body: newNote
        };

        res.json(response);
      
      }

    });
  }

  });
  

module.exports = notesRouter;