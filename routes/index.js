const express = require('express');
const notesRouter = require('./notes');
api = express.Router();


//Initializing notes route
api.use('/notes', notesRouter);

module.exports = api;