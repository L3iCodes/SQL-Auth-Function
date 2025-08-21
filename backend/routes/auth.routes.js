import express from 'express'
import { sign_up } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/sign_up', sign_up);

export default router;