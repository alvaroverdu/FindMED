/*
Importación de módulos
*/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require ('./database/configdb');

// Crear una aplicación de express
const app = express();

dbConnection();

app.use(cors());


// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT );
});

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Respuesta'
    });
});