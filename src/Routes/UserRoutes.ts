import { Router } from 'express';
import { UserController } from '../Controller/index';
import { ROUTES_URL } from '../Util/Constants';
const router = Router();

router.get(ROUTES_URL.GET_USER_LIST, UserController.userList);

export default router;
