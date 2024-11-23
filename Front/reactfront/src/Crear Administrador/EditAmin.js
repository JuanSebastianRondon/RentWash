import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const URI= 'http://localhost:8000/Admin/'

const CompEditAdmin=()=>{
    const [cedula, setCedula]= useState('');
    const [nombre, setNombre]= useState('');
    const [apellido, setapellido]= useState('');
    const [telefono, setTelefono]= useState('');
    const [correo, setcorreo]= useState('');
    const [Contraseña, setContraseña]= useState('');
    const navigate =useNavigate();
    const {id}=useParams();

//procedimiento para actualizar
    const update = async (e)=>{
        e.preventDefault();
        await axios.put(URI+id,{
            cedula:cedula,
            nombre:nombre,
            apellido:apellido,
            telefono:telefono,
            correo:correo,
            Contraseña:Contraseña
        })
        navigate('/');
    }
    useEffect(()=>{
        getAdminById()
    },[])

    const getAdminById=async ()=>{
        const res=await axios.get(URI+id)
        setCedula(res.data.cedula);
        setNombre(res.data.nombre);
        setapellido(res.data.apellido);
        setTelefono(res.data.telefono);
        setcorreo(res.data.correo);
        setContraseña(res.data.Contraseña);
    }

    return(  
        <div>
            <h3>Editar Admin</h3>    
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Cedula</label>
                    <input
                        value={cedula}
                        onChange={(e)=>setCedula(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>    
                <div className='mb-3'>
                    <label className='form-label'>nombre</label>
                    <input
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>    
                <div className='mb-3'>
                    <label className='form-label'>apellido</label>
                    <input
                        value={apellido}
                        onChange={(e)=>setapellido(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>telefono</label>
                    <input
                        value={telefono}
                        onChange={(e)=>setTelefono(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div> 
            
                <div className='mb-3'>
                    <label className='form-label'>correo</label>
                    <input
                        value={correo}
                        onChange={(e)=>setcorreo(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>    
                <div className='mb-3'>
                    <label className='form-label'>contraseña</label>
                    <input
                        value={Contraseña}
                        onChange={(e)=>setContraseña(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>    
            <button type='submit' className= 'btn btn-primary'>Editar</button>
            
            </form>
        </div>
    )



}

export default CompEditAdmin;