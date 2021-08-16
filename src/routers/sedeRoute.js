import { Router } from 'express';
import { getSede, getSedeById, postSede, putSede } from '../controllers/sede.controller';

const router = Router();

router.get('/sedes', getSede);
router.post('/sedes', postSede);
router.put('/sedes', putSede);
router.get('/sedes/:id', getSedeById);

export default router;