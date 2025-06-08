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
router.get('/:id', getUserById);
router.post('/authorizedUser', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
