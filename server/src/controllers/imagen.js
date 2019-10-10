'use strict'
const mysql = require('../database/basededatos');
const multer = require('multer');



function getTodasImagenes(req,res) {
  mysql.query('select * from imagen', (err, results, fields) => {
      if(!err) {
          res.status(200).send({ Imagenes: results });
      }else{
          res.status(500).send({ message: 'Error en la peticion' });
      }
  });
}

function getImagenes(req,res) {
  let album = req.params.album;
  mysql.query('select * from imagen where album = ?', [album], (err, results, fields) => {
      if(!err) {
          res.status(200).send({ Imagenes: results });
      }else{
          res.status(500).send({ message: 'Error en la peticion' });
      }
  });
}

function getImagen(req,res) {
  let {album, id} = req.params;
  mysql.query('select * from imagen where album = ? and id = ?', [album, id], (err, results, fields) => {
      if(!err) {
          if(results[0] == null || results[0] == undefined || results[0] == '') {
            res.status(404).send({ message: 'No hay imagenes'});
          }else{
            res.status(200).send({ album: results[0] });
          }
      }else{
          res.status(500).send({ message: 'Error en la petición' });
      }
  });
}

function saveImagen(req,res) {
  
  var { nombre, descripcion, imagen } = req.body;
  var { album } = req.params;

  if(nombre!="" && descripcion != ""){

  mysql.query('insert into imagen(album, nombre, descripcion, imagen) values (?,?,?,?)', [album, nombre, descripcion, imagen], (err, results, fields) => {
      if(!err) {
            res.status(200).send({ message: 'Dato guardado correctamente' });
      }else{
          res.status(500).send({ message: 'Error en la petición' });
      }
  });
  }else{
    res.status(200).send({ message: '¡Campos vacios en la inscripción!' });
  }
}

function saveImagenConAlbum(req,res) {
  
  var { album, nombre, descripcion, imagen } = req.body;

  

  mysql.query('insert into imagen(album, nombre, descripcion, imagen) values (?,?,?,?)', [album, nombre, descripcion, imagen], (err, results, fields) => {
      if(!err) {
            res.status(200).send({ message: '!Dato guardado correctamente¡' });
      }else{
          res.status(500).send({ message: 'Error en la petición' });
      }
  });
  
}

function updateImagen(req, res) {
  let { id, album } = req.params;
  var { nombre, descripcion, imagen } = req.body;


  mysql.query('update imagen set imagen.nombre = ?, imagen.descripcion = ? , imagen.imagen = ? where imagen.id = ? and imagen.album = ?', [nombre, descripcion, imagen, id, album], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.changedRows == 1) {
        res.status(200).send({ message: 'Actualizacion exitosa' });
      }else {
        res.status(404).send({ message: 'No se encontro la imagen' });
      }
    }
  });
}

function updateImagenConAlbum(req, res) {
  let { id } = req.params;
  var { nombre, descripcion, imagen } = req.body;

  mysql.query('update imagen set imagen.nombre = ?, imagen.descripcion = ? , imagen.imagen = ? where imagen.id = ?', [nombre, descripcion, imagen, id], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.changedRows == 1) {
        res.status(200).send({ message: 'Actualizacion exitosa' });
      }else {
        res.status(404).send({ message: 'No se encontro la imagen' });
      }
    }
  });
}

function deleteImagen(req, res) {
  let { id } = req.params;

  mysql.query('delete from imagen where imagen.id = ?', [id], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.affectedRows == 1){
        res.status(200).send({ message: 'Se elimino exitosamente el dato' });
      }else{
        res.status(404).send({ message: 'No se encontro la imagen' });
        console.log(results);
      }
    }
  });
}

function uploadFile(red,res) { 
  res.json({
    'message': 'Fichero subido'
  });
}

module.exports = {
  getTodasImagenes,
  getImagenes,
  getImagen,
  saveImagen,
  saveImagenConAlbum,
  updateImagen,
  updateImagenConAlbum,
  deleteImagen,
  uploadFile
}