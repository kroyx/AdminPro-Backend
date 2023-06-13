const Medico       = require('../models/medico');
const { response } = require('express');

const getMedicos = async (req, res = response) => {
  try {

    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || null;

    const [ medicos, total ] = await Promise.all([
      Medico
        .find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
        .skip(desde)
        .limit(limit),
      Medico.count(),
    ]);

    return res.json({
      ok: true,
      medicos,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const getMedico = async (req, res = response) => {
  const id = req.params.id;

  try {

    const medico = await Medico
      .findById(id)
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');

    return res.json({
      ok: true,
      medico,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
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

    const medico = await Medico.findById(id);

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

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

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

    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: 'El Medico indicado por el id no existe',
      });
    }

    await Medico.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: 'El medico se ha eliminado correctamente',
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
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};