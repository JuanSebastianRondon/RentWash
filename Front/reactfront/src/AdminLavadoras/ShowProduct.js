import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BASE_URI = 'http://localhost:8000';
const PRODUCT_URI = `${BASE_URI}/Product/`;

const CompShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    // Cargar productos desde la API
    const getProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(PRODUCT_URI);
            setProducts(res.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            setError('Error al cargar los productos. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // Eliminar producto
    const deleteProduct = async (id, nombre) => {
        const isConfirmed = window.confirm(`¿Está seguro que desea eliminar el producto "${nombre}"?`);
        
        if (!isConfirmed) return;

        try {
            setDeleteLoading(id);
            await axios.delete(`${PRODUCT_URI}${id}`);
            // Eliminar el producto de la lista local (sin necesidad de hacer otra petición)
            setProducts(products.filter(product => product.idProducto !== id));
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert('Error al eliminar el producto. Por favor, intente nuevamente.');
        } finally {
            setDeleteLoading(null);
        }
    };

    const getImageUrl = (rutaImagen) => {
        if (!rutaImagen) return '/placeholder-image.jpg';
        const path = rutaImagen.startsWith('/') ? rutaImagen.slice(1) : rutaImagen;
        return `${BASE_URI}/${path}`;
    };

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-3">
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button 
                        className="btn btn-outline-danger ms-3"
                        onClick={() => getProducts()}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='container mt-4'>
            <div className='row mb-3'>
                <div className='col d-flex justify-content-between align-items-center'>
                    <h2>Lista de Productos</h2>
                    <Link to="/create" className='btn btn-primary'>
                        <i className="fa-solid fa-plus me-2"></i>
                        Nuevo Producto
                    </Link>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    No hay productos disponibles. ¡Añade uno nuevo!
                </div>
            ) : (
                <div className='table-responsive'>
                    <table className='table table-hover'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Disponible</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.idProducto}>
                                    <td className="align-middle">{product.nombreProducto}</td>
                                    <td className="align-middle">
                                        ${product.precio.toLocaleString('es-ES', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </td>
                                    <td className="align-middle">
                                        <span className={`badge ${product.Disponibilidad ? 'bg-success' : 'bg-danger'}`}>
                                            {product.Disponibilidad ? 'Disponible' : 'No disponible'}
                                        </span>
                                    </td>
                                    <td className="align-middle">
                                        {product.ruta_imagen && (
                                            <img
                                                src={getImageUrl(product.ruta_imagen)}
                                                alt={product.nombreProducto}
                                                className="img-thumbnail"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="align-middle">
                                        <div className="btn-group" role="group">
                                            <Link 
                                                to={`/edit/${product.idProducto}`} 
                                                className="btn btn-info me-2"
                                                title="Editar producto"
                                            >
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </Link>
                                            <button 
                                                onClick={() => deleteProduct(product.idProducto, product.nombreProducto)} 
                                                className='btn btn-danger'
                                                disabled={deleteLoading === product.idProducto}
                                                title="Eliminar producto"
                                            >
                                                {deleteLoading === product.idProducto ? (
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                ) : (
                                                    <i className="fa-solid fa-trash"></i>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompShowProduct;
