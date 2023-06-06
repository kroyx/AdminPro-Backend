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
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });

  try {

    const newMedico = await medico.save();

    return res.json({
      ok: true,
      medico: newMedico
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador'
    })
  }
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