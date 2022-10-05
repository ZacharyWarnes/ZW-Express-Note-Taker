const express = require('express');
const notesRouter = require('./notes');
const api = express.Router();


//Initializing notes route
api.use('/notes', notesRouter);

module.exports = api;