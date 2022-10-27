const express = require('express');
const path = require('path');
const api = require('./routes/index.js')


const PORT = process.env.PORT || 3002;

//use express to initialize the 'app' server
const app = express();

//Middleware for parsing JSON and url-encoding form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api)

app.use(express.static('public'));



//GET Route for viewing notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Wildcard route default to index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')) 
);


//Using app to listen to designated PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
