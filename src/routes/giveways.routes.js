import { Router } from "express";
import givewayController from "../controllers/giveway.controller.js";
const router = Router();

router.get('/getGiveways', givewayController.getGiveways);

router.post('/createGiveway', givewayController.createGiveway)

export default router;