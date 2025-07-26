import { Router } from 'express';
import {
  getOutflow,
  getOutflowById,
  createOutflow,
  updateOutflow,
  deleteOutflow,
} from '../controllers/outflowController';

const router = Router();

router.get('/outflow', getOutflow);
router.get('/outflow/:id', getOutflowById);
router.post('/outflow/register', createOutflow);
router.put('/outflow/:id', updateOutflow);
router.delete('/outflow/:id', deleteOutflow);

export default router;
