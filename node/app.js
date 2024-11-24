import express from 'express';
import cors from 'cors';
import db from './SRC/config/dbConfig.js';
import  {AdminRoutes, ProductRoutes}  from './SRC/Routes/routes.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use('/Imagenes', express.static(path.join(__dirname, 'public/Imagenes')));

//RUTAS
app.use('/Admin',AdminRoutes);
app.use('/Product',ProductRoutes);

//configuracion carpeta imagenes
const uploadsFolder = 'public/Imagenes'; // Aseguramos que las imágenes estén dentro de una carpeta pública
if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true }); // Crear la carpeta si no existe
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsFolder); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    },
});


const upload = multer({ storage });

app.post('/Product/Imagenes', upload.single('file'), (req, res) => {
    try {
        const filePath = `/Imagenes/${req.file.filename}`; // Ruta que se almacenará en la base de datos
        res.status(201).json({
            message: 'Imagen subida exitosamente',
            ruta: filePath, // Esta es la URL que se devolverá para que el frontend la guarde
        });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
});

try {
    await db.authenticate()
    console.log('Conexion exitosa')
} catch (error) {
    console.log( `Error:${error}`)
}
app.use('/Imagenes', express.static(path.join(uploadsFolder)));


app.get('/',(req,res)=>{
    res.send('Hola')
});



app.listen(8000, ()=>{
    console.log('Server up in http://localhost:8000/')
});
