const { response } = require('express');

const Usuario = require('../models/usuario');

const validarAdminRole = async (req, res = response, next) => {

  const uid = req.uid;

  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }

    if (usuario.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: 'El usuario no dispone de privilegios suficientes para realizar la acción',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

const validarAdminRole_MismoUsuario = async (req, res = response, next) => {

  const idUsuario           = req.uid;
  const idUsuarioActualizar = req.params.id;

  try {

    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }

    if (usuario.role === 'ADMIN_ROLE' || idUsuario === idUsuarioActualizar) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: 'El usuario no dispone de privilegios suficientes para realizar la acción',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, hable con el administrador',
    });
  }
};

module.exports = {
  validarAdminRole,
  validarAdminRole_MismoUsuario
};