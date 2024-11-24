import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URI = 'http://localhost:8000';
const PRODUCT_URI = `${BASE_URI}/Product/`;
const UPLOAD_URI = `${BASE_URI}/Product/Imagenes`;

const CompEditProduct = () => {
    const [nombreProducto, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponibilidad, setDisponibilidad] = useState(false);
    const [rutaImagen, setRuta] = useState('');
    const [imagen, setImagen] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let imagenUrl = rutaImagen;

            if (imagen) {
                const formData = new FormData();
                formData.append('file', imagen);
                
                try {
                    const uploadResponse = await axios.post(UPLOAD_URI, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });

                    if (uploadResponse.data && uploadResponse.data.ruta) {
                        imagenUrl = uploadResponse.data.ruta;
                    } else {
                        throw new Error('Error al subir la imagen');
                    }
                } catch (uploadError) {
                    console.error('Error al subir la imagen:', uploadError);
                    setError('Error al subir la imagen');
                    return;
                }
            }

            await axios.put(PRODUCT_URI + id, {
                nombreProducto,
                precio: parseFloat(precio),
                Disponibilidad: disponibilidad,
                ruta_imagen: imagenUrl,
            });

            // Redirigir a la lista de productos
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setError('Error al actualizar el producto');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(PRODUCT_URI + id);
                const product = res.data;
                setNombre(product.nombreProducto);
                setPrecio(product.precio);
                setDisponibilidad(product.Disponibilidad);
                setRuta(product.ruta_imagen);
                setPreviewImage(product.ruta_imagen);
            } catch (error) {
                console.error('Error al obtener producto:', error);
                setError('No se pudo cargar el producto');
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="container mt-4">
            <h2>Editar Producto</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={update}>
                <div className="mb-3">
                    <label htmlFor="nombreProducto" className="form-label">Nombre del Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreProducto"
                        value={nombreProducto}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="disponibilidad" className="form-label">Disponible</label>
                    <input
                        type="checkbox"
                        id="disponibilidad"
                        checked={disponibilidad}
                        onChange={(e) => setDisponibilidad(e.target.checked)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imagen"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setImagen(file);
                            setPreviewImage(URL.createObjectURL(file)); // Vista previa
                        }}
                    />
                </div>
                {previewImage && (
                    <div className="mb-3">
                        <img src={previewImage} alt="Vista previa" className="img-thumbnail" width="100" />
                    </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Actualizar Producto'}
                </button>
            </form>
        </div>
    );
};

export default CompEditProduct;
