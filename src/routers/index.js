import { Router } from 'express';
import equipoRoute from './equipoRoute';
import nivelRoute from './nivelRoute';
import estadoRoute from './estadoRoute';
import sedeRoute from './sedeRoute';
import soporteRoute from './soporteRoute';
import ticketRoute from './ticketRoute';

const router = Router();

router.use(equipoRoute);
router.use(nivelRoute);
router.use(estadoRoute);
router.use(sedeRoute);
router.use(soporteRoute);
router.use(ticketRoute);

export default router;