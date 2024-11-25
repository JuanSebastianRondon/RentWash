import BarModel from "../Models/BarrioModel";

//Crud

//Mostrar todos los barrios
export const getAllUser= async(req, res)=>{
 try {
    const barrios = await BarModel.findAll();
    res.json(barrios);
} catch (error) {
    res.json({message: error.message})
    }  
}

//Mostrar un barrio por id
export const getUserById= async(req, res)=>{
    try {
       const barrio = await BarModel.findByPk(req.params.id)
       if(!barrio){
       return  res.status(404).json({message:'barrio no encontrado'});
       }
       res.json(user);
   } catch (error) {
       res.json({message: error.message})
       }  
   }

//Crear un barrio
export const CreateUser= async(req,res)=>{
    try 
    {
    await BarModel.create(req.body);
        res.json({
            "message":"barrio registrado"
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//Actualizar un  barrio
export const updateUser = async(req,res)=>{
    try {
      const result= await BarModel.update(req.body,{
            where:{Idbarrio:req.params.id}
        });
        if(result[0]===0){
            return res.status(404).json({message:'barrio no encontrado'});
        }
        res.json({
            "message":"barrio Actualizado"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

//Eliminar un barrio
export const deleteUser=async(req,res)=>{
    try {
    const result = await BarModel.destroy({
            where:{Idbarrio:req.params.id}
        })
        if(result ===0){
            return res.status(404).json({ message: "No se encuentra ese barrio" });
        }
        res.json({ message: "barrio eliminado correctamente" });
    } catch (error) {
        res.json({message: error.message});
    }
};
