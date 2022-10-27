
const fs = require('fs');
const uuid = require('../helpers/uuid');
const notesRouter = require('express').Router();
const db = require('../db/db.json');
const {readFromFile} = require('../helpers/fsUtils');


// GET Route for retrieving all notes
notesRouter.get('/', (req,res) => {
res.json(db);
});
 
  
  //POST Route for submitting note
  notesRouter.post('/', (req,res) => {
    
    //Destructing assignment for the items in req.body
    const { text, title } = req.body;
  
    //If all the required properties are present
    if (text && title) {
      //Variable for the object to save
      const newNote = {
        text,
        title,
        id: uuid(),
      }

      db.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(db, null, 4), (err) => 
      err 
        ? console.error(err) 
        : console.info(`Note Submitted`)
      );
    
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
 

module.exports = notesRouter;

