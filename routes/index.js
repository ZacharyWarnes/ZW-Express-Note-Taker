const express = require('express');

//Import modular router for notes
const notesRouter = require('./notes');

// Initializing app 
const app = express();

//Initializing notes route
app.use('/notes', notesRouter);

module.exports = app;