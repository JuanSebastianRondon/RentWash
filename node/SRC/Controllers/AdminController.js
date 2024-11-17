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

//Mostrar un admin
export const getAdmin= async(req, res)=>{
    try {
       const admin = await AdminModel.findAll({
        where:{ cedula:req.params.id}
       });
       res.json(admin);
   } catch (error) {
       res.json({message: error.message})
       }  
   }

//Crear un admin
export const CreateAdmin= async(res,req)=>{
    try 
    {
        await AdminModel.create(req.body)
        res.json({
            "message":"Admin registrado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}
//Actualizar un  admin
export const updateAdmin = async(res,req)=>{
    try {
       await AdminModel.update(req.body,{
            where:{cedula:req.params.id}
        })
        res.json({
            "message":"Admin Actualizado"
        })
    } catch (error) {
        res.json({message: error.message})

    }
}
//Eliminar un admin

export const deleteAdmin=async(res,req)=>{
    try {
        AdminModel.destroy({
            where:{cedula:req.params.id}
        })
    } catch (error) {
        res.json({message: error.message})

    }
}
