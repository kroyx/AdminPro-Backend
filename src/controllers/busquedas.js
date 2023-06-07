const { response } = require('express');

const Usuario      = require('../models/usuario');
const Hospital     = require('../models/hospital');
const Medico       = require('../models/medico');

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex    = new RegExp(busqueda, 'i');

  try {

    const [ usuarios, hospitales, medicos ] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
    ]);

    return res.json({
      ok: true,
      usuarios,
      hospitales,
      medicos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla    = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex    = new RegExp(busqueda, 'i');
  let data       = [];

  try {
    switch (tabla) {
      case 'medicos':
        data = await Medico
          .find({ nombre: regex })
          .populate('usuario', 'nombre img')
          .populate('hospital', 'nombre img');
        break;
      case 'hospitales':
        data = await Hospital
          .find({ nombre: regex })
          .populate('usuario', 'nombre img');
        break;
      case 'usuarios':
        data = await Usuario.find({ nombre: regex });
        break;
      default:
        return res.status(400).json({
          ok: false,
          msg: 'La tabla tiene que ser usuarios, medicos u hospitales',
        });
    }
    return res.json({
      ok: true,
      resultados: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};