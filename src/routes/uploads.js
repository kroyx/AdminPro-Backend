/*
 Busquedas
 Ruta: /api/todos
 */
const { Router }        = require('express');
const { check }         = require('express-validator');
const expressFileUpload = require('express-fileupload');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT }           = require('../middlewares/validar-jwt');
const { fileUpload, getImage } = require('../controllers/uploads');

const router = Router();
router.use(expressFileUpload());


router.put('/:tipo/:id', [
  validarJWT,
], fileUpload);

router.get('/:tipo/:nombre', getImage);

module.exports = router;