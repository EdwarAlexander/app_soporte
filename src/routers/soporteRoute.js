import { Router } from 'express';
import { getSoporte, getSoporteById, postSoporte, putSoporte } from '../controllers/soporte.controller';

const router = Router();

router.get('/soportes', getSoporte);
router.post('/soportes', postSoporte);
router.put('/soportes', putSoporte);
router.get('/soportes/:id', getSoporteById);

export default router;