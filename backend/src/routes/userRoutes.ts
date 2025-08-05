import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';
import { validateRegister } from '../middlewares/validateRegister';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', validateRegister, createUser);

router.get('/', authenticateUser, getUsers);
router.get('/:id', authenticateUser, getUserById);
router.put('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, deleteUser);

export default router;
