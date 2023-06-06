const Medico      = require('../models/medico');
const { response } = require('express');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'obtener medicos'
  })
}

const crearMedico = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'crear medico'
  })
}

const actualizarMedico = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'actualizar medico'
  })
}

const borrarMedico = async (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'borrar medico'
  })
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};