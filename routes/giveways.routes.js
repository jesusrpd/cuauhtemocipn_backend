import { Router } from "express";
import givewayController from "../controllers/giveway.controller.js";
import verifyAuth from "../middlewares/verifyToken.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = Router();

router.get('/getGiveways', verifyAuth ,givewayController.getGiveways);

router.post('/createGiveway', [verifyAuth, upload.array('images')], givewayController.createGiveway);

router.get('/getGiveway/:id', givewayController.getGivewayOnly);

router.post('/getAwards', givewayController.getAwards);

router.put('/giveway/:id', verifyAuth, givewayController.updateGiveway)

export default router;