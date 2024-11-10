const express = require('express');
const app = express();
const config = require('./config');
const port = 3306;

const lavadoras =require('./rutas.js');

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => { 
  console.log(`Servidor escuchando en http://localhost:${3306}`);
});
