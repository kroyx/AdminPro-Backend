const { response }   = require('express');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const fs = require('fs');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

class FileData {
  constructor(tipo, id, path, nombreArchivo) {
    this.tipo = tipo;
    this.id = id;
    this.path = path;
    this.nombreArchivo = nombreArchivo;
  }
}

const fileUpload = async (req, res = response) => {

  const tipo = req.params.tipo;
  const id   = req.params.id;

  // Validación del tipo
  const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un médico, usuario u hospital (tipo)',
    });
  }

  // Validación del archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningún archivo',
    });
  }

  // Procesar la imagen
  const file             = req.files.imagen;
  const segmentosNombre  = file.name.split('.');
  const extensionArchivo = segmentosNombre[segmentosNombre.length - 1];

  // validar extension
  const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extensión válida',
    });
  }

  // Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // Path para guardar la imagen
  const path = `./src/uploads/${tipo}/${nombreArchivo}`;
  const fileData = new FileData(tipo, id, path, nombreArchivo);

  const resultadoActualizacion = await actualizarImagen(fileData);
  if (!resultadoActualizacion) {
    return res.status(400).json({
      ok: false,
      msg: 'No se ha encontrado un documento con el id indicado'
    })
  }

  // Mover la imagen
  file.mv(path, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al guardar la imagen en el servidor'
      })
    }

    res.json({
      ok: true,
      msg: 'El archivo se ha subido correctamente',
      nombre: nombreArchivo
    })
  });
};

const getImage = async (req, res = response) => {
  const tipo = req.params.tipo;
  const nombre   = req.params.nombre;

  let pathImg = path.join(__dirname, `../uploads/${tipo}/${nombre}`);

  if (!fs.existsSync(pathImg)) {
    pathImg = path.join(__dirname, `../uploads/no-image.png`);
  }
  return res.sendFile(pathImg);
}

module.exports = {
  fileUpload,
  getImage
};