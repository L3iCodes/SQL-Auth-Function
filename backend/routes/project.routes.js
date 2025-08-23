import express from 'express';
import { add_project, delete_project, get_project_list} from '../controller/project.controller.js'

const router = express.Router();

router.post("/add_project", add_project)
router.post("/delete_project", delete_project)
router.post("/get_project", get_project_list) //Change to get

export default router;