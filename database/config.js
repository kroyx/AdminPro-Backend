const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de datos');
    }
}

module.exports = {
    dbConnection
}