import { Router } from 'express';
import { getEquipo, getEquipoById, postEquipo, putEquipo } from '../controllers/equipo.controller';

const router = Router();

router.get('/equipos', getEquipo);
router.post('/equipos', postEquipo);
router.put('/equipos', putEquipo);
router.get('/equipos/:id', getEquipoById);

export default router;