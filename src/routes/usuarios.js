/*
 Ruta: /api/usuarios
 */

const { Router }        = require('express');
const { check }         = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT }    = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, actualizarUsuario, deleteUsuario } = require(
  '../controllers/usuarios');
const { validarAdminRole, validarAdminRole_MismoUsuario }             = require(
  '../middlewares/validar-admin');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
  ], crearUsuario);

router.put('/:id',
  [
    validarJWT,
    validarAdminRole_MismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
  ], actualizarUsuario);

router.delete('/:id', [
  validarJWT,
  validarAdminRole,
], deleteUsuario);

module.exports = router;