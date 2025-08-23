import express from 'express'
import { sign_up, login, refresh, logout, verifyToken, authenticateJWT } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/sign_up', sign_up);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.get('/verify', authenticateJWT, verifyToken);

export default router;