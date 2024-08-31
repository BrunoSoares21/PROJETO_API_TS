import { Router } from "express"
import TaskController from "../../controllers/task/task.controller"
import authMiddleware from "../../middlewares/auth.middlewares"

const taskRoutes = Router()

taskRoutes.get('/',  TaskController.index)
taskRoutes.post('/', authMiddleware, TaskController.store)

export default taskRoutes
