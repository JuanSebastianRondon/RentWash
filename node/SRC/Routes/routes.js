import express from 'express'
import { CreateAdmin, deleteAdmin, getAdminById,
     getAllAdmin, updateAdmin } from '../Controllers/AdminController.js';
import { CreateProduct, deleteProduct, getAllProd,
      getProductById, updateProduct } from '../Controllers/ProductController.js';
const AdminRoutes = express.Router();
const ProductRoutes = express.Router();
//Administrador
AdminRoutes.get('/',getAllAdmin);
AdminRoutes.get('/:id',getAdminById);
AdminRoutes.post('/',CreateAdmin);
AdminRoutes.put('/:id',updateAdmin);
AdminRoutes.delete('/:id',deleteAdmin);

//Productos
ProductRoutes.get('/',getAllProd);
ProductRoutes.get('/:id',getProductById);
ProductRoutes.post('/',CreateProduct);
ProductRoutes.put('/:id',updateProduct);
ProductRoutes.delete('/:id',deleteProduct);

export  { AdminRoutes, ProductRoutes };
