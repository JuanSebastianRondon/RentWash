import axios from 'axios'; // Usamos axios para hacer peticiones HTTP
import BarModel from "../Models/BarrioModel";

// Función para obtener las coordenadas a partir de una dirección usando un servicio de geocodificación
const getCoordinatesFromAddress = async (address) => {
    const apiKey = 'TU_API_KEY_DE_GOOGLE_MAPS'; // Usa tu API key de Google Maps o cualquier otro servicio
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const location = response.data.results[0]?.geometry.location;
        if (location) {
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error('Dirección no encontrada');
        }
    } catch (error) {
        throw new Error('Error al obtener las coordenadas: ' + error.message);
    }
};

// Función para determinar el barrio a partir de las coordenadas
export const getBarrioFromAddress = async (req, res) => {
    const { direccion } = req.body;

    try {
        const { lat, lng } = await getCoordinatesFromAddress(direccion);

        // Buscar en la base de datos el barrio que contenga estas coordenadas
        const barrios = await BarModel.findAll();

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
