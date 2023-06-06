require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./src/database/config');
const cors = require('cors');
const app = express();

// Activar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/login', require('./src/routes/auth'));
app.use('/api/usuarios', require('./src/routes/usuarios'));
app.use('/api/hospitales', require('./src/routes/hospitales'));

app.listen(process.env.PORT)