import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI= 'http://localhost:8000/Product/'

const CompCreateAdmin=()=>{
    const [cedula, setCedula]= useState('');
    const [nombre, setNombre]= useState('');
    const [apellido, setapellido]= useState('');
    const [telefono, setTelefono]= useState('');
    const [correo, setcorreo]= useState('');
    const [Contraseña, setContraseña]= useState('');


    const navigate =useNavigate();
    
    //Procedimiento de guardar
    const store = async(e)=>{
        e.preventDefault();
        if (!cedula || !nombre || !apellido ||!telefono
            || !correo || !Contraseña) {
            alert('Por favor completa todos los campos');
            return;
        }
       await axios.post(URI,{
        cedula:cedula,
        nombre:nombre,
        apellido:apellido,
        telefono:telefono,
        correo:correo,
        Contraseña:Contraseña
       })
       navigate('/');
    }
    
    return(  
        <div>
            <h3>Crear Admin</h3>    
            <form onSubmit={store}>
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
            <button type='submit' className= 'btn btn-primary'>Store</button>
            
            </form>
        </div>
    )

}

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('imagen', file);

    try {
        const response = await axios.post('http://localhost:8000/Admin/Imagenes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Imagen subida:', response.data);
        return response.data.ruta; // Devuelve la ruta para guardarla en la base de datos
    } catch (error) {
        console.error('Error al subir la imagen:', error);
    }
};

export default CompCreateAdmin;
