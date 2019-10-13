'use strict'

const cors = require('cors');
const express = require('express');
const bodyParser = require ('body-parser');

const app = express();


//settings
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Cors
app.use(cors()); 

// Local Routes
var album = require('./routes/album');
var imagen = require('./routes/imagen');

// Routes
app.use('/api', album);
app.use('/api', imagen);


// Starting the server
app.listen(app.get('port'), () => {
  console.log('app escuchando en el puerto:', app.get('port'));
});