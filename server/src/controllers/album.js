'use strict'

const mysql = require('../database/basededatos');

const utils = require('../services/utils.js')

function getAlbums(req,res) {
  mysql.query('select * from album', (err, results, fields) => {
    if(!err) res.status(200).send({ albums: results });
    console.log(results)
    else res.status(500).send({ message: 'Error en la peticion' });
  });
}

function getAlbum(req,res) {
    let id = req.params.id;
    mysql.query('select * from album where id = ?', [id], (err, results, fields) => {
        if(!err) {
            if(results[0] == null || results[0] == undefined || results[0] == '') {
              res.status(404).send({ message: 'No hay albums'});
            }else{
              res.status(200).send({ album: results[0] });
            }
        }else{
            res.status(500).send({ message: 'Error en la petición' });
        }
    });
}

function saveAlbum(req,res) {
  
  var { nombre } = req.body;

  if(utils.verifyString(nombre)){
    mysql.query('insert into album(nombre) values (?)', [nombre], (err, results, fields) => {
        if(!err) {
            res.status(200).send({ message: '¡Album '+ nombre +' guardado!' });
        }else{
            res.status(500).send({ message: 'Error en la petición' });
        }
    });
  }else{
    res.status(200).send({ message: '¡Nombre Indefinido!' });
  }

}

function updateAlbum(req, res) {
  let { id } = req.params
  var { nombre } = req.body;

  mysql.query('update album set nombre = ? where id = ?', [nombre, id], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la petición' });
    }else{
      if(results.changedRows == 1) {
        res.status(200).send({ message: 'Actualizacion exitosa' });
      }else {
        res.status(404).send({ message: 'No se encontro el album' });
      }
    }
  });
}

function deleteAlbum(req, res) {
  let { id } = req.params;

  mysql.query('delete from album where id = ?', [id], (err, results, fields) => {
    if(err) {
      res.status(500).send({ message: 'Error en la peteción' });
    }else{
      if(results.affectedRows == 1){
        res.status(200).send({ message: '¡Album Eliminado!' });
      }else{
        res.status(404).send({ message: 'No se encontro el album' });
      }
    }
  });
}

module.exports = {
    getAlbums, 
    getAlbum,
    saveAlbum,
    updateAlbum,
    deleteAlbum
}