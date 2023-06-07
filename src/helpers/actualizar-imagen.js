const fs = require('fs');

const Usuario      = require('../models/usuario');
const Hospital     = require('../models/hospital');
const Medico       = require('../models/medico');

const actualizarImagen = async (fileData) => {
  const { id, tipo, nombreArchivo} = fileData;
  let data;

  // Se obtiene el documento según su tipo
  switch (tipo) {
    case 'usuarios':
      data =  await Usuario.findById(id);
      break;
    case 'medicos':
      data =  await Medico.findById(id);
      break;
    case 'hospitales':
      data =  await Hospital.findById(id);
      break;
  }

  if (!data) {
    console.log('No se ha encontrado un documento con el id indicado');
    return false;
  }

  // Se comprueba si tiene ya una imagen y se borra
  const pathAntiguo = `./src/uploads/${tipo}/${data.img}`;
  if (fs.existsSync(pathAntiguo)) {
    fs.unlinkSync(pathAntiguo)
  }

  // Se asigna la nueva imagen
  data.img = nombreArchivo;
  await data.save();
  return true;
}

module.exports = {
  actualizarImagen
}