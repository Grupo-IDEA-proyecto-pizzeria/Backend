import express from 'express';

const response = express.response;

export const usuariosGet = ( req, res = response ) => {

  const  { q, nombre = 'No name', apikey, page = 1, limit} = req.query

  res.json({
    msg: 'Get API - controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  });
}

export const usuariosPost = ( req, res = response ) => {

  const { nombre, edad } = req.query;

  res.json({
    msg: 'Post API - controlador',
    nombre,
    edad
  });

}

export const usuariosPut = ( req, res = response ) => {

  const { id } = req.params;

  res.json({
    msg: 'Put API - controlador',
    id
  });

}

export const usuariosDelete = ( req, res = response ) => {
  res.json({
    msg: 'Delete API - controlador'
  });
}

