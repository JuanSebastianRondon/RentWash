import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/Product/';

const CompCreateProduct = () => {
    const [nombreProducto, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponibilidad, setDisponibilidad] = useState(false); // Booleano
    const [rutaImagen, setRutaImagen] = useState(''); // Guardará la URL de la imagen
    const [imagen, setImagen] = useState(null); // Para manejar el archivo de imagen
    const navigate = useNavigate();

    // Procedimiento de guardar
    const store = async (e) => {
        e.preventDefault();

        // Validación de campos
        if (!nombreProducto || !precio || !disponibilidad || !imagen) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Subir la imagen primero si hay una seleccionada
        let imagenUrl = rutaImagen; // Si no hay nueva imagen, mantener la URL existente
        if (imagen) {
            imagenUrl = await uploadImage(imagen);
        }

        // Guardar producto con la URL de la imagen
        await axios.post(URI, {
            nombreProducto: nombreProducto,
            precio: parseFloat(precio), // Asegurarse de que sea un número
            Disponibilidad: disponibilidad, // Booleano
            ruta_imagen: imagenUrl, // La URL de la imagen
        });

        navigate('/'); // Redirigir al home
    };

    // Manejar la selección de la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
    };

    // Función para subir la imagen
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file); // Añadir archivo al FormData

        try {
            const response = await axios.post('http://localhost:8000/Product/Imagenes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            return response.data.url; // Suponiendo que el servidor devuelve la URL de la imagen subida
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    return (
        <div>
            <h3>Crear Producto</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombreProducto}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        type="number"
                        className='form-control'
                        step="0.01" // Permite ingresar decimales
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Disponible</label>
                    <select
                        value={disponibilidad}
                        onChange={(e) => setDisponibilidad(e.target.value === 'true')}
                        className='form-control'
                    >
                        <option value="true">Disponible</option>
                        <option value="false">No disponible</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Imagen</label>
                    <input
                        type="file"
                        className='form-control'
                        onChange={handleImageChange}
                    />
                    {imagen && <div>Imagen seleccionada: {imagen.name}</div>}
                </div>

                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    );
};

export default CompCreateProduct;
