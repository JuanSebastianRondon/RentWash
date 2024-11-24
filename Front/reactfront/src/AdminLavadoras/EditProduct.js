import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/Product/';

const CompEditProduct = () => {
    const [nombreProducto, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponibilidad, setDisponibilidad] = useState(false); // Booleano
    const [rutaImagen, setRuta] = useState('');
    const [imagen, setImagen] = useState(null); // Para manejar la imagen seleccionada
    const navigate = useNavigate();
    const { id } = useParams();

    // Procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();

        // Subir la imagen si hay una nueva
        let imagenUrl = rutaImagen; // Si no hay nueva imagen, mantener la URL existente
        if (imagen) {
            const formData = new FormData();
            formData.append('file', imagen); // Añadir el archivo de la imagen
            try {
                const res = await axios.post('http://localhost:8000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                imagenUrl = res.data.url; // Suponiendo que el servidor devuelve la URL de la imagen subida
            } catch (error) {
                console.error("Error al subir la imagen", error);
            }
        }

        // Actualizar producto con la URL de la imagen
        await axios.put(URI + id, {
            nombreProducto: nombreProducto,
            precio: parseFloat(precio), // Asegurarse de que es un número
            Disponibilidad: disponibilidad, // Booleano
            ruta_imagen: imagenUrl,
        });

        navigate('/'); // Redirige al home
    };

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const res = await axios.get(URI + id);
        setNombre(res.data.nombreProducto);
        setPrecio(res.data.precio);
        setDisponibilidad(res.data.Disponibilidad); // Asegura que sea un booleano
        setRuta(res.data.ruta_imagen);
    };

    // Manejar la selección de la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
    };

    return (
        <div>
            <h3>Editar Lavadora</h3>
            <form onSubmit={update}>
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
                    {rutaImagen && !imagen && (
                        <div>
                            <img src={rutaImagen} alt="Imagen del producto" style={{ width: '100px', marginTop: '10px' }} />
                        </div>
                    )}
                </div>

                <button type='submit' className='btn btn-primary'>Editar</button>
            </form>
        </div>
    );
};

export default CompEditProduct;
