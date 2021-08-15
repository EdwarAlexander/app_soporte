import { Router } from 'express';
import equipoRoute from './equipoRoute';
import nivelRoute from './nivelRoute';
import estadoRoute from './estadoRoute';

const router = Router();

router.use(equipoRoute);
router.use(nivelRoute);
router.use(estadoRoute);

export default router;