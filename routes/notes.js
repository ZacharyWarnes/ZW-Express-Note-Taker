
const fs = require('fs');
const uuid = require('../helpers/uuid');
const notesRouter = require('express').Router();
const { readAndAppend, readFromFile, } = require('../helpers/fsUtils')
const db = require('../db/db.json');


// GET Route for retrieving all notes
notesRouter.get('/api/notes', (req,res) => {
  // Send a message to the client
  res.status(200).json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});
 
  //   console.info(`${req.method} request received for notes`)
  //   readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
  // });

  
  //POST Route for submitting note
  notesRouter.post('/api/notes', (req,res) => {
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

    //Obtain existing notes
    fs.readFile('../db/db.json', 'utf8', (err, data)=> {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes= JSON.parse(data);

        parsedNotes.push(newNote);

      fs.writeFile(
        '../db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) => 
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes')
      );
      }
    });
      


    //push newNote to empty array in db.json
      // db.push(newNote);

    // fs.writeFile('../db/db.json', JSON.stringify(db, null, 4), (error) => {
    //   if (error) {
    //     res.status(500).json('Could not save note');
    //   } else {

    // readAndAppend(newNote, '../db/db.json');
        
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

