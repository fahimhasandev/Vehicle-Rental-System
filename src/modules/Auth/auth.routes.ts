import { Router } from 'express';
import { userControllers } from './auth.controller';

const router = Router();

router.post('/signup', userControllers.signupUser);
router.post('/signin', userControllers.signinUser);

export const userRoutes = router;
