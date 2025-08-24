import express from 'express';
import { add_project, delete_project, get_project_list} from '../controller/project.controller.js'
import { authenticateJWT } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/add_project", authenticateJWT, add_project)
router.post("/delete_project", authenticateJWT, delete_project)
router.get("/get_project", authenticateJWT, get_project_list)

export default router;