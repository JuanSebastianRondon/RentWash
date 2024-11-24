import express from 'express';
import cors from 'cors';
import db from './SRC/config/dbConfig.js';
import { AdminRoutes, ProductRoutes } from './SRC/Routes/routes.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Configuración de __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración carpeta imágenes
const uploadsFolder = path.join(__dirname, 'public', 'Imagenes');

// Crear la carpeta si no existe
if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no válido'));
        }
    }
});

// Servir archivos estáticos
app.use('/Imagenes', express.static(uploadsFolder));

// RUTAS
app.use('/Admin', AdminRoutes);
app.use('/Product', ProductRoutes);

// Ruta para subir imágenes
app.post('/Product/Imagenes', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha proporcionado ningún archivo' });
        }
        
        const filePath = `/Imagenes/${req.file.filename}`;
        res.status(201).json({
            message: 'Imagen subida exitosamente',
            ruta: filePath,
        });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ 
            message: 'Error al subir la imagen',
            error: error.message 
        });
    }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: err.message
    });
});

// Conexión a la base de datos
const initializeServer = async () => {
    try {
        await db.authenticate();
        console.log('Conexión a la base de datos exitosa');
        
        app.listen(8000, () => {
            console.log('Server up in http://localhost:8000/');
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

initializeServer();