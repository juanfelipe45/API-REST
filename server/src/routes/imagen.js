const express = require('express');
const api = express.Router();

const ImagenController = require('../controllers/imagen');

api.get('/imagen', ImagenController.getImagenes);
api.post('/imagen', ImagenController.saveImagen);
api.get('/imagen/:id', ImagenController.getImagen);
api.post('/upload/:id', ImagenController.uploadFile);
api.put('/imagen/:id', ImagenController.updateImagen);
api.delete('/imagen/:id', ImagenController.deleteImagen);
api.post('/imagen/:albums', ImagenController.saveImagen);
api.get('/picture/:imageFile', ImagenController.getPicture);
api.get('/imagen-album/:id', ImagenController.getImagenesXalbum);

module.exports = api;