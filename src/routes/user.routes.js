import {Router} from 'express';
import controllers_user from '../controllers/user.controller.js';
const router = Router();

router.post('/login/', controllers_user.login);

router.post('/signup', controllers_user.signup);

router.get("/getUsers", controllers_user.getUsers);


export default router;