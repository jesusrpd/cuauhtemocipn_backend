import {Router} from 'express';
import controllers_user from '../controllers/user.controller.js';
const router = Router();

router.get("/getUsers", controllers_user.getUsers);

export default router;