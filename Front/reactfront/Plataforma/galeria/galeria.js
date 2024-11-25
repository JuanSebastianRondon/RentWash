const { useState, useEffect } = React;

const BASE_URI = 'http://localhost:8000';  // Base URI de la API
const PRODUCT_URI = `${BASE_URI}/Product/`;

const GaleriaLavadoras = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Obtener productos de la API
        axios.get(PRODUCT_URI)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar los productos. Por favor, intente nuevamente.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="spinner">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Función para construir la URL de la imagen, con un valor por defecto en caso de error
    const getImageUrl = (rutaImagen) => {
        if (!rutaImagen) {
            return '/placeholder-image.jpg';  // Imagen por defecto si la ruta está vacía
        }
        const path = rutaImagen.startsWith('/') ? rutaImagen.slice(1) : rutaImagen;
        return `${BASE_URI}/${path}`;
    };

    return (
        <div className="lavadoras-container">
            {products.length === 0 ? (
                <div>No hay lavadoras disponibles.</div>
            ) : (
                products.map(product => (
                    <div className="lavadora-card" key={product.idProducto}>
                        {/* Imagen con manejo de errores y tamaño grande */}
                        <img
                            src={getImageUrl(product.ruta_imagen)}
                            alt={product.nombreProducto}
                            className="img-thumbnail"
                            style={{
                                width: '250px',  // Imagen más grande
                                height: '250px',
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg'; // Imagen predeterminada si falla la carga
                            }}
                        />
                        <h3>{product.nombreProducto}</h3>
                        <p>Modelo: {product.modelo}</p>
                        <p>Estado: {product.Disponibilidad ? 'Disponible' : 'No disponible'}</p>
                        <button className="btn">Agregar al carrito</button>
                    </div>
                ))
            )}
        </div>
    );
};

// Renderizar el componente en el contenedor
ReactDOM.render(<GaleriaLavadoras />, document.getElementById('gallery-root'));
