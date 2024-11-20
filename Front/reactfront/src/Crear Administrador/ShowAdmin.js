import axios from 'axios'
import {useState, useEffect} from 'react'
import {link} from 'react-router-dom'

const URI= 'http:://localhost:8000/Admin/'

const CompShowAdmin=()=>{
    
    const[Admin, setAdmin] =useState([])
    useEffect(()=>{
        getAdminById()
    },[]);

    //Procedimineto para mostrar todos los admins
    const getAdmins =async()=>{
        const res =await axios.get(URI);
        setAdmin(res.data);
    }
//procedimiento para eliminar un admin
    const deleteAdmin =async(id)=>{
        axios.delete(`${URI}${id}`);
        getAdmins();
    }
    return(<div className='container'>
            <div className='row'>
                <div className='col'>
                
                </div>
            </div>
        </div>);

}

export default CompShowAdmin;