import axios from 'axios';  // Usamos axios para hacer peticiones HTTP
import BarModel from "../Models/BarrioModel.js";  // Importamos el modelo de Barrio

// Función para obtener las coordenadas a partir de una dirección usando un servicio de geocodificación
const getCoordinatesFromAddress = async (address) => {
    const apiKey = '935297473b1e4869aa1242101b81141a'; // Usa tu API key de OpenCage o cualquier otro servicio
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

// Función para obtener el barrio basado en la dirección
export const getBarrioFromAddress = async (req, res) => {
    const { direccion } = req.body;

    try {
        // Obtener las coordenadas de la dirección
        const { lat, lng } = await getCoordinatesFromAddress(direccion);

        // Buscar todos los barrios en la base de datos
        const barrios = await BarModel.findAll();

        // Verificar si la latitud y longitud caen dentro de los límites de algún barrio
        for (const barrio of barrios) {
            if (lat >= barrio.latMin && lat <= barrio.latMax && lng >= barrio.lonMin && lng <= barrio.lonMax) {
                return res.json({
                    message: 'Barrio encontrado',
                    barrio: barrio.nombre,
                });
            }
        }

        return res.status(404).json({ message: 'No se pudo determinar el barrio para la dirección proporcionada.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
