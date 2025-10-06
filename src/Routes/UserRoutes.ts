import { Router } from 'express';
import { UserController } from '../Controller/index';
const router = Router();
/**
 * @swagger
 * /api/user/list:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/list', UserController.userList);
router.post('/save', UserController.CreateUser);

export default router;
