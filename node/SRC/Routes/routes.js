import express from 'express'
import { CreateAdmin, deleteAdmin, getAdminById,
     getAllAdmin, updateAdmin } from '../Controllers/AdminController.js';
const router =express.Router();


router.get('/',getAllAdmin);
router.get('/:id',getAdminById);
router.post('/',CreateAdmin);
router.put('/:id',updateAdmin);
router.delete('/:id',deleteAdmin);

export default router;
