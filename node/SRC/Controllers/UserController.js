import axios from 'axios'; // Usamos axios para hacer peticiones HTTP
import ModelUser from "../Models/UserModel.js";
import BarModel from "../Models/BarrioModel.js";  // Importamos el modelo de Barrio

// Función para obtener las coordenadas a partir de una dirección usando OpenCage API
const getCoordinatesFromAddress = async (address) => {
    const apiKey = 'TU_API_KEY_DE_OPENCAGE'; // Usa tu API key de OpenCage o cualquier otro servicio
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const location = response.data.results[0]?.geometry;
        if (location) {
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error('Dirección no encontrada');
        }
    } catch (error) {
        throw new Error('Error al obtener las coordenadas: ' + error.message);
    }
};

// Función para determinar el barrio a partir de la dirección
const getBarrioFromCoordinates = async (lat, lng) => {
    const barrios = await BarModel.findAll();
    for (const barrio of barrios) {
        if (lat >= barrio.latMin && lat <= barrio.latMax && lng >= barrio.lonMin && lng <= barrio.lonMax) {
            return barrio.id;  // Retorna el id del barrio que corresponde
        }
    }
    throw new Error('No se pudo determinar el barrio para las coordenadas proporcionadas.');
};

// CRUD

// Mostrar todos los usuarios
export const loginUser = async (req, res) => {
    try {
        const { correo, Contraseña } = req.body;

        const usuario = await ModelUser.findOne({ 
            where: { correo },
            include: [{ model: BarModel, as: 'Barrio' }]
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña (en producción, usa bcrypt o similar)
        if (usuario.Contraseña !== Contraseña) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // No devolver la contraseña
        const { Contraseña: pass, ...usuarioSinContraseña } = usuario.toJSON();

        res.json({ 
            message: 'Inicio de sesión exitoso', 
            usuario: usuarioSinContraseña 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mostrar un usuario por cédula
export const getUserById = async (req, res) => {
    try {
        const user = await ModelUser.findByPk(req.params.id, {
            include: [{ model: BarModel, as: 'Barrio' }]  // Relacionando el usuario con su barrio
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un usuario
export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, telefono, correo, direccion, Contraseña } = req.body;

        const existingUser = await ModelUser.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Obtener las coordenadas de la dirección proporcionada
        const { lat, lng } = await getCoordinatesFromAddress(direccion);

        // Obtener el barrio correspondiente a las coordenadas
        const barrioId = await getBarrioFromCoordinates(lat, lng);

        const nuevoUsuario = await ModelUser.create({
            nombre,
            apellido,
            telefono,
            correo,
            IdBarrio: barrioId, // Asignamos el barrio al usuario
            Contraseña
        });

        const { Contraseña: pass, ...usuarioSinContraseña } = nuevoUsuario.toJSON();

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            usuario: usuarioSinContraseña 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, telefono, correo, direccion, Contraseña } = req.body;

        // Obtener las coordenadas de la dirección proporcionada
        const { lat, lng } = await getCoordinatesFromAddress(direccion);

        // Obtener el barrio correspondiente a las coordenadas
        const barrioId = await getBarrioFromCoordinates(lat, lng);

        const result = await ModelUser.update({
            nombre,
            apellido,
            telefono,
            correo,
            IdBarrio: barrioId, // Actualizamos el barrio
            Contraseña
        }, {
            where: { id }
        });

        if (result[0] === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const { cedula } = req.params;
        const { contraseña } = req.body; // Obteniendo la contraseña para la autenticación

        const user = await ModelUser.findByPk(cedula);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña antes de eliminar el usuario
        if (user.Contraseña !== contraseña) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        await ModelUser.destroy({ where: { cedula } });
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
