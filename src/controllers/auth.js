const Usuario      = require('../models/usuario');
const { response } = require('express');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar usuario
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'El email no existe',
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

const googleSignIn = async (req, res = response) => {
  try {

    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    } else {
      usuario = usuarioDB;
      usuario.google = true;
      // usuario.password = '@@';
    }

    // Guardar el usuario
    await usuario.save();

    // Generar el token JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(400)
      .json({
        ok: false,
        msg: 'El token de Google no es válido',
      });
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Obtener el token
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario
  })
}

module.exports = {
  login,
  googleSignIn,
  renewToken
};