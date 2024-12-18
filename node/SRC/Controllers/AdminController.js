import AdminModel  from "../Models/AdministradorModel.js";

//Crud

//Mostrar todos los admin
export const getAllAdmin= async(req, res)=>{
 try {
    const admins = await AdminModel.findAll();
    res.json(admins);
} catch (error) {
    res.json({message: error.message})
    }  
}

//Mostrar un admin por cedula
export const getAdminById= async(req, res)=>{
    try {
       const admin = await AdminModel.findByPk(req.params.id)
       if(!admin){
       return  res.status(404).json({message:'Admin no encontrado'});
       }
       res.json(admin);
   } catch (error) {
       res.json({message: error.message})
       }  
   }

//Crear un admin
export const CreateAdmin= async(req,res)=>{
    try 
    {
    await AdminModel.create(req.body);
        res.json({
            "message":"Admin registrado"
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//Actualizar un  admin
export const updateAdmin = async(req,res)=>{
    try {
      const result= await AdminModel.update(req.body,{
            where:{cedula:req.params.id}
        });
        if(result[0]===0){
            return res.status(404).json({message:'Admin no encontrado'});
        }
        res.json({
            "message":"Admin Actualizado"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}
//Eliminar un admin

export const deleteAdmin=async(req,res)=>{
    try {
    const result = await AdminModel.destroy({
            where:{cedula:req.params.id}
        })
        if(result ===0){
            return res.status(404).json({ message: "No se encuentra ese admin" });
        }
        res.json({ message: "Admin eliminado correctamente" });
    } catch (error) {
        res.json({message: error.message});
    }
};
