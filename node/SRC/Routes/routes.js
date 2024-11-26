import express from 'express'
import { CreateAdmin, deleteAdmin, getAdminById,
     getAllAdmin, updateAdmin } from '../Controllers/AdminController.js';
import { CreateProduct, deleteProduct, getAllProd,
      getProductById, updateProduct } from '../Controllers/ProductController.js';
import { CreateUser, deleteUser, getAllUser,
       getUserById, updateUser } from '../Controllers/UserController.js';
import { getAllBarrios, getBarrioById, getBarrioFromAddress } from '../Controllers/BarrioController.js';

const AdminRoutes = express.Router();
const ProductRoutes = express.Router();
const UserRoutes = express.Router();
const BarrioRoutes = express.Router();



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

//Usuarios
UserRoutes.post('/',CreateUser);
UserRoutes.put('/:id',updateUser);
UserRoutes.delete('/:id',deleteUser);

//Barrios
BarrioRoutes.post('/detectar-barrio',getBarrioFromAddress);




export  { AdminRoutes, ProductRoutes, UserRoutes, BarrioRoutes };
