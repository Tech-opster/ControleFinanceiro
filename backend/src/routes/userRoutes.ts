import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';
import { validateRegister } from '../controllers/validateRegister';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/register', validateRegister, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
