import { Router } from 'express';
import { getEstado, getEstadoById, postEstado, putEstado } from '../controllers/estado.controller';

const router = Router();

router.get('/estados', getEstado);
router.post('/estados', postEstado);
router.put('/estados', putEstado);
router.get('/estados/:id', getEstadoById);

export default router;
