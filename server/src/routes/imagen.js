const express = require('express');
const api = express.Router();
const multiparty = require('connect-multiparty');

const ImagenController = require('../controllers/imagen');
const multipartyMiddleware = multiparty({uploadDir: './archivos'});


api.get('/imagen', ImagenController.getTodasImagenes);
api.get('/imagen/:album', ImagenController.getImagenes);
api.get('/imagen/:album/:id', ImagenController.getImagen);
api.post('/imagen/:album', ImagenController.saveImagen);
api.post('/imagen', ImagenController.saveImagenConAlbum);
api.put('/imagen/:album/:id', ImagenController.updateImagen);
api.put('/imagen/:id', ImagenController.updateImagenConAlbum);
api.delete('/imagen/:id', ImagenController.deleteImagen);
api.post('/api/subir', multipartyMiddleware, ImagenController.uploadFile);

module.exports = api;