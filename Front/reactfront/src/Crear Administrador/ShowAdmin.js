import axios from 'axios'
import {useState, useEffect} from 'react'
import {link} from 'react-router-dom'

const URI= 'http://localhost:8000/Admin/'

const CompShowAdmin=()=>{
    
    const[Admin, setAdmin] =useState([])
    useEffect(()=>{
        getAdmins()
    },[]);

    //Procedimineto para mostrar todos los admins
    const getAdmins =async()=>{
        const res =await axios.get(URI);
        setAdmin(res.data);
    }

//procedimiento para eliminar un admin
    const deleteAdmin =async(cedula)=>{
        axios.delete(`${URI}${cedula}`);
        getAdmins();
    }
    return(<div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className= 'table-primary'>
                            <tr>
                                <th>cedula</th>
                                <th>nombre</th>
                                <th>Apellido</th>
                                <th>correo</th>  
                                <th>Borrar</th>
 
                            </tr>
                        </thead>
                            <tbody>
                                {Admin.map ((Admin)=>(
                                    <tr key={Admin.cedula}>
                                        <td >{Admin.cedula}</td>
                                        <td >{Admin.nombre}</td>
                                        <td >{Admin.apellido}</td>
                                        <td >{Admin.correo}</td>

                                        <td>
                                       {// <link to={`/edit/${Admin.cedula}`}className="btn btn-info">Editar</link>
                                            }
                                    <button onClick={()=>deleteAdmin(Admin.cedula)} className='btn btn-danger'>delete</button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                    </table>
                 </div>
            </div>
        </div>);

}

export default CompShowAdmin;