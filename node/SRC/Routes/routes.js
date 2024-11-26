import express from 'express';
import { CreateAdmin, deleteAdmin, getAdminById, getAllAdmin, updateAdmin } from '../Controllers/AdminController.js';
import { CreateProduct, deleteProduct, getAllProd, getProductById, updateProduct } from '../Controllers/ProductController.js';
import { 
      createUser, 
      loginUser, 
      getUserById, 
      updateUser, 
      deleteUser 
  } from '../Controllers/UserController.js';
  import { getBarrioFromAddress } from '../Controllers/BarrioController.js';

const AdminRoutes = express.Router();
const ProductRoutes = express.Router();
const UserRoutes = express.Router();

// Rutas de Administrador
AdminRoutes.get('/', getAllAdmin);
AdminRoutes.get('/:id', getAdminById);
AdminRoutes.post('/', CreateAdmin);
AdminRoutes.put('/:id', updateAdmin);
AdminRoutes.delete('/:id', deleteAdmin);

// Rutas de Productos
ProductRoutes.get('/', getAllProd);
ProductRoutes.get('/:id', getProductById);
ProductRoutes.post('/', CreateProduct);
ProductRoutes.put('/:id', updateProduct);
ProductRoutes.delete('/:id', deleteProduct);

// Rutas de Usuarios
UserRoutes.post('/registro', createUser); // Registrar nuevo usuario
UserRoutes.post('/login', loginUser); // Iniciar sesión

// Rutas de perfil de usuario
UserRoutes.get('/:id', getUserById); // Obtener perfil de usuario
UserRoutes.put('/:id', updateUser); // Actualizar perfil de usuario
UserRoutes.delete('/:id', deleteUser); // Eliminar cuenta de usuario

// Ruta para detectar barrio (mantenida de la versión anterior)
UserRoutes.post('/detectar-barrio', getBarrioFromAddress); 
export { AdminRoutes, ProductRoutes, UserRoutes };
