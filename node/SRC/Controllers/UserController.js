import ModelUser from "../Models/UserModel";

//Crud

//Mostrar todos los usuarios
export const getAllUser= async(req, res)=>{
 try {
    const Users = await ModelUser.findAll();
    res.json(Users);
} catch (error) {
    res.json({message: error.message})
    }  
}

//Mostrar un usuario por cedula
export const getUserById= async(req, res)=>{
    try {
       const user = await ModelUser.findByPk(req.params.id)
       if(!user){
       return  res.status(404).json({message:'Admin no encontrado'});
       }
       res.json(user);
   } catch (error) {
       res.json({message: error.message})
       }  
   }

//Crear un usuario
export const CreateUser= async(req,res)=>{
    try 
    {
    await ModelUser.create(req.body);
        res.json({
            "message":"Usuario registrado"
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//Actualizar un  usuario
export const updateUser = async(req,res)=>{
    try {
      const result= await ModelUser.update(req.body,{
            where:{cedula:req.params.id}
        });
        if(result[0]===0){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        res.json({
            "message":"Usuario Actualizado"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}
//Eliminar un usuario

export const deleteUser=async(req,res)=>{
    try {
    const result = await ModelUser.destroy({
            where:{cedula:req.params.id}
        })
        if(result ===0){
            return res.status(404).json({ message: "No se encuentra ese usuario" });
        }
        res.json({ message: "usuario eliminado correctamente" });
    } catch (error) {
        res.json({message: error.message});
    }
};
