import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const URI= 'http://localhost:8000/Product/'

const CompShowProduct=()=>{
    
    const[Product, setProduct] =useState([])
    useEffect(()=>{
        getProducts()
    },[]);

    //Procedimineto para mostrar todos los Productos
    const getProducts =async()=>{
        const res =await axios.get(URI);
        setProduct(res.data);
    }

//procedimiento para eliminar un Productos
    const deleteProduct =async(id)=>{
       await axios.delete(`${URI}${id}`);
       getProducts();
    }
    return(<div className='container'>
            <div className='row'>
                <div className='col'>
                <Link to="/create" className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-plus"></i></Link>

                    <table className='table'>
                        <thead className= 'table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Disponible</th>
                                <th>Lavadora</th>
                            </tr>
                        </thead>
                            <tbody>
                                {Product.map ((Product)=>(
                                    <tr key={Product.idProducto}>
                                        <td >{Product.nombreProducto}</td>
                                        <td >{Product.precio}</td>
                                        <td>{Product.Disponibilidad ? 'Sí' : 'No'}</td>
                                        <td >
                                        {Product.ruta_imagen && (
                                            <img
                                                src={`http://localhost:8000/${Product.ruta_imagen}`} // Ruta pública de la imagen
                                                alt={Product.nombreProducto}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        )}
                                        </td>
                                        <td>
                                       <Link to={`/edit/${Product.idProducto}`} className="btn btn-info"><i class="fa-regular fa-pen-to-square"></i></Link>
                                            
                                    <button onClick={()=>deleteProduct(Product.idProducto)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                 </div>
            </div>
        </div>);

}

export default CompShowProduct;