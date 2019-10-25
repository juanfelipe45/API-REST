'use strict'

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const utils = require('../services/utils.js')
const mysql = require('../database/basededatos');

const DIR = path.resolve('src/uploads/');
const storage = multer.diskStorage({
  destination: DIR,
  filename: (req, file, callback) =>{
     callback(null,file.originalname);
   }
 });
const upload = multer({ storage: storage, dest: DIR }).single('imagen');

// Funciones

// Todas las imagenes
function getImagenes(req, res) {
  mysql.query('SELECT  i.id,a.nombre album,i.nombre,i.descripcion,i.imagen FROM Imagen i inner join Album a on i.album = a.id', (err, results, fields) => {
    if(err) return res.status(500).send({ message: 'Error en el servidor' });

    else if(utils.verifyString(results)) return res.status(200).send({ Imagenes: results });

    else return res.status(404).send({ message: 'No se encontro resultados' });
  });
}

// Imagen especifica
function getImagen(req, res) {
  let { id } = req.params;

  mysql.query('SELECT album,nombre,descripcion,imagen FROM Imagen where id = ?', [id], (err, results, fields) => {
    if(err) return res.status(500).send({ message: 'Error en el servidor', err });
    
    else if(utils.verifyString(results)) return res.status(200).send({ Imagen: results });

    else return res.status(404).send({ message: 'No se encontro resultados' });
  });
}

  // Imagenes Por album
  function getImagenesXalbum(req, res){
    let { id } = req.params;

    mysql.query('SELECT album,nombre,descripcion,imagen FROM Imagen where album = ?', [id], (err, results, fields) => {
      if(err) return res.status(500).send({ message: 'Error en el servidor', err });
    
      else if(utils.verifyString(results)) return res.status(200).send({ Imagenes: results });

      else return res.status(404).send({ message: 'No se encontro resultados' });
    });
  } 

function saveImagen(req, res) {
  var path = '';

  upload(req, res, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send('Error en el servidor');
    }
    path = req.file.path;
    var file_split =  path.split('uploads\\');
    var count = file_split.length;
    var file_name =  file_split[count -1];
    if(utils.verifyString(path) && utils.verifyString(req.body.nombre) && utils.verifyString(req.body.descripcion) &&utils.verifyString(req.body.album)) {
      mysql.query('INSERT INTO Imagen(album,nombre,descripcion,imagen) VALUES (?,?,?,?)',[req.body.album,req.body.nombre,req.body.descripcion,file_name], (err, results, fields) => {
        if(err){
          fs.unlinkSync(path);
          return res.status(500).send({ message: 'Error en la petición', err });
        } 
        else return res.status(200).send({ message:'Se inserto correctamente el dato', data: results });
      })
    }
    else return res.status(202).send({message: 'No se pudo hacer el upload'});
  });
}

function updateImagen(req, res) {
  var { id } = req.params;
  var { album, nombre, descripcion } = req.body;
  if (utils.verifyString(album) && utils.verifyString(nombre) && utils.verifyString(descripcion) && utils.verifyString(id)){
    mysql.query('UPDATE Imagen SET album = ?, nombre = ?,  descripcion = ? WHERE id = ?', [album, nombre, descripcion, id], (err, results, fields) => {
      if(err) return res.status(500).send({ message: 'Error en la petición', err });
      else return res.status(200).send({ message:'El dato se ha actualizado'});
    });
  }else return res.status(404).send({message: 'No se lleno un campo'});
}

function deleteImagen(req, res) {
  var { id, imagen } = req.params;
  if(utils.verifyString(id) && utils.verifyString(imagen)) {
    mysql.query('DELETE FROM Imagen WHERE id = ?', [id], (err, results, fields) => {
      if (err) return res.status(500).send({message: 'Error en el servidor'});
      else {
        fs.unlinkSync(DIR + '/' + imagen);
        return res.status(200).send({message: 'El dato ha sido eliminado'});
      }
    })
  }else return res.status(404).send({message: 'No se encontro la información necesaria'});
} 

function getPicture(req, res){
  var imageFile =  req.params.imageFile;
  if(utils.verifyString(imageFile))  return res.sendFile(DIR + '/' + imageFile);
  else return res.status(404).send({message: 'No se encotraron resultados'});
}

function uploadFile (req, res, next) { 
  var path = '';
  var { id } = req.params;

  upload(req, res, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send('Error en el servidor');
    }
    path = req.file.path;
    var file_split =  path.split('uploads\\');
    var file_name = file_split[1];
    if(utils.verifyString(path)) {
      mysql.query('update Imagen set imagen = ? where id = ?',[file_name,id], (err, results, fields) => {
        if(err){
          fs.unlinkSync(path);
          return res.status(500).send({ message: 'Error en la petición', err });
        } 
        else if(utils.verifyString(id)) return res.status(200).send({ message:'Actualizacion completa para: ' + path });
      });
    }
    else return res.status(202).send({message: 'No se pudo hacer el upload'});
  });
}



module.exports = {
  getImagen,
  uploadFile,
  getPicture,
  saveImagen,
  getImagenes,
  updateImagen,
  deleteImagen,
  getImagenesXalbum
}