import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/Product/';

const CompCreateProduct = () => {
    const [nombreProducto, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponibilidad, setDisponibilidad] = useState(false);
    const [rutaImagen, setRutaImagen] = useState('');
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    // Procedimiento de guardar
    const store = async (e) => {
        e.preventDefault();
        try {
            // Validación de campos
            if (!nombreProducto || !precio || imagen === null) {
                alert('Por favor completa todos los campos');
                return;
            }

            // Primero subir la imagen
            let imagenUrl = '';
            if (imagen) {
                const formData = new FormData();
                formData.append('file', imagen);

                const uploadResponse = await axios.post('http://localhost:8000/Product/Imagenes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Importante: aquí usamos 'ruta' en lugar de 'url' según tu backend
                imagenUrl = uploadResponse.data.ruta;
            }

            // Luego crear el producto
            await axios.post(URI, {
                nombreProducto: nombreProducto,
                precio: parseFloat(precio),
                Disponibilidad: disponibilidad,
                ruta_imagen: imagenUrl
            });

            navigate('/');
        } catch (error) {
            console.error('Error completo:', error);
            if (error.response) {
                console.error('Datos del error:', error.response.data);
            }
            alert('Error al crear el producto: ' + error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB
                alert('La imagen es demasiado grande. Máximo 5MB');
                e.target.value = '';
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                alert('Solo se permiten archivos de imagen (JPEG, PNG, GIF)');
                e.target.value = '';
                return;
            }
            setImagen(file);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Crear Producto</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                        value={nombreProducto}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio</label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        type="number"
                        className='form-control'
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Disponibilidad</label>
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
                        accept="image/jpeg,image/png,image/gif"
                        required
                    />
                    {imagen && (
                        <div className="mt-2">
                            <small className="text-muted">
                                Imagen seleccionada: {imagen.name}
                            </small>
                        </div>
                    )}
                </div>

                <button type='submit' className='btn btn-primary'>
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default CompCreateProduct;