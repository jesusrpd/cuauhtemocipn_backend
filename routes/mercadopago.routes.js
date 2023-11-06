import { Router } from "express";
import mercadopagoControllers from "../controllers/mercadopago.controllers.js";
const router = Router();

router.get('/create-order', mercadopagoControllers.createPayment)

export default router