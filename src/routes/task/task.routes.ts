import { Router } from "express"
import TaskController from "../../controllers/task/task.controller"

const taskRoutes = Router()

taskRoutes.post('/', TaskController.store)
taskRoutes.get('/', TaskController.index)

export default taskRoutes
