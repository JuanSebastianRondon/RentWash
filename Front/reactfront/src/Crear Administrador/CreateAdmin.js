import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI= 'http://localhost:8000/Admin/'

const CompCreateAdmin=()=>{
    const [cedula, setCedula]= useState('');
    const [nombre, setNombre]= useState('');
    const navigate =useNavigate();
    
    //Procedimiento de guardar
    const store = async(e)=>{
        e.preventDefault()
       await axios,post(URI,{
        cedula:cedula,
        nombre:nombre,
        apellido:apellido,
        correo:correo,
        Contraseña:Contraseña
       })
       navigate('/');
    }
    
    return(  
        <div>
        <h3>Crear Admin</h3> 
        <form>

        
        </form>
        </div>
    )

}
