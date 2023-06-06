const Usuario      = require('../models/usuario');
const { response } = require('express');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'obtener hospital'
  })
}

const crearHospital = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'crear hospital'
  })
}

const actualizarHospital = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'actualizar hospital'
  })
}

const borrarHospital = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'borrar hospital'
  })
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
};