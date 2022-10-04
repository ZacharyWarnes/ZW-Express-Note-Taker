
const fs = require('fs');
const uuid = require('../helpers/uuid');
const notesRouter = require('express').Router();
const { readAndAppend, readFromFile, } = require('../helpers/fsUtils')
const db = require('../db/db.json');


// GET Route for retrieving all notes
notesRouter.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`)
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
  });

  
  //POST Route for submitting note
  notesRouter.post('/', (req,res) => {
    console.info(`${req.method} request received to add a note`)
  
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
      
    //push newNote to empty array in db.json
      // db.push(newNote);

    // fs.writeFile('../db/db.json', JSON.stringify(db, null, 4), (error) => {
    //   if (error) {
    //     res.status(500).json('Could not save note');
    //   } else {

    readAndAppend(newNote, '../db/db.json');
        
        //success response
        const response = {
          status: 'Success!',
          body: newNote,
        };

        res.json(response);
      } else {
        res.json('Error in posting note');
      }

    });
  // }

  // });
  

module.exports = notesRouter;

