import express from 'express'
import { sign_up, login, refresh } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/sign_up', sign_up);
router.post('/login', login);
router.post('/refresh', refresh);

export default router;