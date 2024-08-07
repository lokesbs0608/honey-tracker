import { Router } from 'express';
import {
    createUser,
    editUser,
    getUsers,
    sendPasswordResetOTP,
    resetPassword
} from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.put('/users/:id', editUser);
router.get('/users', getUsers);
router.post('/users/password-reset-otp', sendPasswordResetOTP);
router.post('/users/reset-password', resetPassword);

export default router;
