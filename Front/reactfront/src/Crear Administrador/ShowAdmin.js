import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

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
       await axios.delete(`${URI}${cedula}`);
        getAdmins();
    }
    return(<div className='container'>
            <div className='row'>
                <div className='col'>
                <Link to="/create" className='btn btn-primary mt-2 mb-2'><i class="fa-solid fa-plus"></i></Link>


                    <table className='table'>
                        <thead className= 'table-primary'>
                            <tr>
                                <th>cedula</th>
                                <th>nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>correo</th>  
                            </tr>
                        </thead>
                            <tbody>
                                {Admin.map ((Admin)=>(
                                    <tr key={Admin.cedula}>
                                        <td >{Admin.cedula}</td>
                                        <td >{Admin.nombre}</td>
                                        <td >{Admin.telefono}</td>
                                        <td >{Admin.apellido}</td>
                                        <td >{Admin.correo}</td>

                                        <td>
                                       <Link to={`/edit/${Admin.cedula}`} className="btn btn-info"><i class="fa-regular fa-pen-to-square"></i></Link>
                                            
                                    <button onClick={()=>deleteAdmin(Admin.cedula)} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
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