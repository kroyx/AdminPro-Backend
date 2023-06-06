const Usuario      = require('../models/usuario');
const { response } = require('express');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar usuario
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'El email no encontrado',
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    // TODO: generar el token JWT
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      token,
    })
  } catch (error) {
    console.log(error);
    res.status(500)
      .json({
        ok: false,
        msg: 'Contraseña no válida',
      });
  }
}


module.exports = {
  login
};