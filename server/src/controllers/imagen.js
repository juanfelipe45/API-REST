'use strict'

const mysql = require('../database/basededatos');
const multer = require('multer');
var upload = multer({dest: '../uploads/'}).single('imagen');



function getTodasImagenes(req,res) {
  mysql.query('select * from Imagen', (err, results, fields) => {
      if(!err) {
          res.status(200).send({ Imagenes: results });
      }else{
          res.status(500).send({ message: 'Error en la peticion' });
      }
  });
}

function getImagenes(req,res) {
  let album = req.params.album;
  mysql.query('select * from Imagen where album = ?', [album], (err, results, fields) => {
      if(!err) {
          res.status(200).send({ Imagenes: results });
      }else{
          res.status(500).send({ message: 'Error en la peticion' });
      }
  });
}

function getImagen(req,res) {
  let {album, id} = req.params;
  mysql.query('select * from Imagen where album = ? and id = ?', [album, id], (err, results, fields) => {
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
  
  var { nombre, descripcion, Imagen } = req.body;
  var { album } = req.params;

  if(nombre!="" && descripcion != ""){

  mysql.query('insert into Imagen(album, nombre, descripcion, Imagen) values (?,?,?,?)', [album, nombre, descripcion, Imagen], (err, results, fields) => {
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
  
  var { album, nombre, descripcion, Imagen } = req.body;

  

  mysql.query('insert into Imagen(album, nombre, descripcion, Imagen) values (?,?,?,?)', [album, nombre, descripcion, Imagen], (err, results, fields) => {
      if(!err) {
            res.status(200).send({ message: '!Dato guardado correctamente¡' });
      }else{
          res.status(500).send({ message: 'Error en la petición' });
      }
  });
  
}

function updateImagen(req, res) {
  let { id, album } = req.params;
  var { nombre, descripcion, Imagen } = req.body;


  mysql.query('update Imagen set Imagen.nombre = ?, Imagen.descripcion = ? , Imagen.Imagen = ? where Imagen.id = ? and Imagen.album = ?', [nombre, descripcion, Imagen, id, album], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.changedRows == 1) {
        res.status(200).send({ message: 'Actualizacion exitosa' });
      }else {
        res.status(404).send({ message: 'No se encontro la Imagen' });
      }
    }
  });
}

function updateImagenConAlbum(req, res) {
  let { id } = req.params;
  var { nombre, descripcion, Imagen } = req.body;

  mysql.query('update Imagen set Imagen.nombre = ?, Imagen.descripcion = ? , Imagen.Imagen = ? where Imagen.id = ?', [nombre, descripcion, Imagen, id], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.changedRows == 1) {
        res.status(200).send({ message: 'Actualizacion exitosa' });
      }else {
        res.status(404).send({ message: 'No se encontro la Imagen' });
      }
    }
  });
}

function deleteImagen(req, res) {
  let { id } = req.params;

  mysql.query('delete from Imagen where Imagen.id = ?', [id], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.affectedRows == 1){
        res.status(200).send({ message: 'Se elimino exitosamente el dato' });
      }else{
        res.status(404).send({ message: 'No se encontro la Imagen' });
        console.log(results);
      }
    }
  });
}

function uploadFile(req, res, next) { 
  var path = '';

  upload(req, res, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send('Error en el servidor');
    }
    path = req.file.path;
    return res.status(200).send('Actualizacion completa para: ' + path);
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