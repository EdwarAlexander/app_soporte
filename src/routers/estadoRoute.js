import { Router } from 'express';
import { getEstado, postEstado } from '../controllers/estado.controller';

const router = Router();

router.get('/estados', getEstado);
router.post('/estados', postEstado);

export default router;
