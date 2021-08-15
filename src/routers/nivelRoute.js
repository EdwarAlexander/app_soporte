import { Router } from 'express';
import { getNivel, getNivelById, postNivel, putNivel } from '../controllers/nivel.controller';

const router = Router();

router.get('/niveles', getNivel);
router.post('/niveles', postNivel);
router.put('/niveles', putNivel);
router.get('/niveles/:id', getNivelById);

export default router;