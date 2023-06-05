require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
const app = express();

// Crear el servidor de express

// Base de datos
dbConnection();

app.use(cors);

app.listen(process.env.PORT)