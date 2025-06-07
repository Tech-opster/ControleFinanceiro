import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/users/:id', getUserById);
router.post('/authorizedUser', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
