const express = require('express');
const api = express.Router();

const AlbumController = require('../controllers/album');

api.get('/album', AlbumController.getAlbums);
api.get('/album/:id', AlbumController.getAlbum);
api.post('/album', AlbumController.saveAlbum);
api.put('/album/:id', AlbumController.updateAlbum);
api.delete('/album/:id', AlbumController.deleteAlbum);

module.exports = api;