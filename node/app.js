//var mysql = require("mysql");
import express from 'express';
import cors from 'cors';
import db from './SRC/config/dbConfig.js';

import AdminRoutes from './SRC/Routes/routes.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use('/Administrador',AdminRoutes);

try {
    await db.authenticate()
    console.log('Conexion exitosa')
} catch (error) {
    console.log( `Error:${error}`)
}

/*
app.get('/',(req,res)=>{
    res.send('Hola')
});
*/

app.listen(8000, ()=>{
    console.log('Server up in http://localhost:8000/')
});
