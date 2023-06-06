const Hospital = require('../models/hospital')
const { response } = require('express');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {
  try {
    return res.json({
      ok: true,
      msg: 'obtener hospitales',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador'
    })
  }
}

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body
  });

  try {

    const newHospital = await hospital.save();

    return res.json({
      ok: true,
      hospital: newHospital
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador'
    })
  }
}

const actualizarHospital = async (req, res = response) => {
  try {
    return res.json({
      ok: true,
      msg: 'actualizar hospital',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador'
    })
  }
}

const borrarHospital = async (req, res = response) => {
  try {
    return res.json({
      ok: true,
      msg: 'borrar hospital',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador'
    })
  }
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
};