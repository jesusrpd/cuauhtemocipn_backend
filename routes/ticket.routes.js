import { Router } from 'express';
import ticketsController from '../controllers/tickets.controller.js';
import middlewareVerifyTokenTicket from '../middlewares/verifyTokenTickets.js'
import multer from 'multer';
const router = Router();
const upload = multer({dest: 'payment/'});
const uploadExcel = multer({dest: 'excel/'});

router.get('/tickets/:id_giveway', ticketsController.getTicketsByGiveway);

router.post('/tickets/buy',upload.single('img_payment'), ticketsController.buyTicket);

router.get('/generate-tickets/:id', middlewareVerifyTokenTicket ,ticketsController.renderTickets);

router.get('/confirm-payment/:id', ticketsController.confirmPayment);

router.post('/generate-token-tickets', ticketsController.generateTokenForTicket);

router.post('/submit-tickets-excel', uploadExcel.single('file'),ticketsController.submitTicketsExcel);

router.post('/auth-ticket', ticketsController.authTicket);

export default router;