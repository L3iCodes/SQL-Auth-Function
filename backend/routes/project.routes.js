import express from 'express';
import { add_project, delete_project} from '../controller/project.controller.js'

const router = express.Router();

router.post("/add_project", add_project)
router.post("/delete_project", delete_project)

export default router;