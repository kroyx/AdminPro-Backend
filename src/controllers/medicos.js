const Medico       = require('../models/medico');
const { response } = require('express');

const getMedicos = async (req, res = response) => {
  try {

    const medicos = await Medico
      .find()
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');

    return res.json({
      ok: true,
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

const crearMedico = async (req, res = response) => {
  const uid    = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {

    const newMedico = await medico.save();

    return res.json({
      ok: true,
      medico: newMedico,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const actualizarMedico = async (req, res = response) => {

  const id         = req.params.id;
  const uid        = req.uid;
  const hospitalId = req.body.hospital;

  try {

    const medico = Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'El Medico indicado por el id no existe',
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

    return res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const borrarMedico = async (req, res = response) => {

  const id = req.params.id;

  try {

    const medico = Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'El Medico indicado por el id no existe',
      });
    }

    await Medico.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: 'El medico se ha eliminado correctamente'
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
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};