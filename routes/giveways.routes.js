import { Router } from "express";
import givewayController from "../controllers/giveway.controller.js";
import verifyAuth from "../middlewares/verifyToken.js";
const router = Router();

router.get('/getGiveways', verifyAuth ,givewayController.getGiveways);

router.post('/createGiveway', verifyAuth, givewayController.createGiveway);

router.get('/getGiveway/:id', givewayController.getGivewayOnly);

router.post('/getAwards', givewayController.getAwards)

export default router;