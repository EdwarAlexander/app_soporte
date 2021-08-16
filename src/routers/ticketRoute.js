import { Router } from 'express';
import { getTicket, getTicketById, postTicket, putTicketDeveloper } from '../controllers/ticket.controller';

const router = Router();

router.get('/tickets', getTicket);
router.post('/tickets', postTicket);
router.get('/tickets/:id', getTicketById);
router.put('/tickets/developer', putTicketDeveloper);

export default router;