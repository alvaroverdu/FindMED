/*
Importación de módulos
*/
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

require('dotenv').config();
const { dbConnection } = require('./database/configdb');

// Crear una aplicación de express
const app = express();

dbConnection();

app.use(cors());
app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: process.env.MAXSIZEUPLOAD * 1024 * 1024 },
    createParentPath: true,
}));

app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/enfermedades', require('./routes/enfermedades'));
app.use('/api/sintomas', require('./routes/sintomas'));
app.use('/api/centros', require('./routes/centros'));

// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
});