import ProdModel from "../Models/ProductModel.js"; 
//Crud

//Mostrar todos los productos
export const getAllProd= async(req, res)=>{
 try {
    const products = await ProdModel.findAll();
    res.json(products);
} catch (error) {
    res.json({message: error.message})
    }  
}

//Mostrar un producto por id
export const getProductById= async(req, res)=>{
    try {
       const product = await ProdModel.findByPk(req.params.id)
       if(!product){
       return  res.status(404).json({message:'Producto no encontrado'});
       }
       res.json(product);
   } catch (error) {
       res.json({message: error.message})
       }  
   }

//Crear un producto
export const CreateProduct= async(req,res)=>{
    try 
    {
    await ProdModel.create(req.body);
        res.json({
            "message":"Producto registrado"
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
//Actualizar un  producto
export const updateProduct = async(req,res)=>{
    try {
      const result= await ProdModel.update(req.body,{
            where:{id:req.params.id}
        });
        if(result[0]===0){
            return res.status(404).json({message:'Producto no encontrado'});
        }
        res.json({
            "message":"Producto Actualizado"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}
//Eliminar un Producto

export const deleteProduct=async(req,res)=>{
    try {
    const result = await ProdModel.destroy({
            where:{id:req.params.id}
        })
        if(result ===0){
            return res.status(404).json({ message: "No se encuentra ese Producto" });
        }
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.json({message: error.message});
    }
};
