// index.js

// Importa los módulos necesarios
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

// Inicializa la aplicación de Express
const app = express();

// Configura bodyParser para analizar solicitudes JSON
app.use(bodyParser.json());

// Configura la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'tu_basededatos',
    password: 'tu_contraseña',
    port: 5432,
});

// Maneja la solicitud de envío del formulario
app.post('/enviar', async (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body;

        // Inserta los datos del formulario en la base de datos
        const queryText = 'INSERT INTO formulario (nombre, correo, mensaje) VALUES ($1, $2, $3)';
        await pool.query(queryText, [nombre, correo, mensaje]);

        // Enviar una respuesta de éxito
        res.status(200).send('Formulario enviado correctamente');
    } catch (error) {
        // Enviar una respuesta de error si algo salió mal
        console.error(error);
        res.status(500).send('Error al procesar el formulario');
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
