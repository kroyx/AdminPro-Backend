const Hospital     = require('../models/hospital');
const { response } = require('express');

const getHospitales = async (req, res = response) => {
  try {

    // Obtiene el usuario completo
    // const hospitales = await Hospital
    //   .find()
    //   .populate('usuario');

    // Obtiene solo los campos especificados
    const hospitales = await Hospital
      .find()
      .populate('usuario', 'nombre img');

    return res.json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const crearHospital = async (req, res = response) => {
  const uid      = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {

    const newHospital = await hospital.save();

    return res.json({
      ok: true,
      hospital: newHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const actualizarHospital = async (req, res = response) => {

  const id  = req.params.id;
  const uid = req.uid;

  try {

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: 'El hospital indicado por id no existe',
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital,
      { new: true });

    return res.json({
      ok: true,
      hospital: hospitalActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const borrarHospital = async (req, res = response) => {

  const id = req.params.id;

  try {

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msg: 'El hospital indicado por id no existe',
      });
    }

    await Hospital.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: 'Hospital eliminado correctamente',
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
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};