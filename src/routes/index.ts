import { Router } from "express"
import taskRoutes from './task/task.routes'
import { deflateSync } from "zlib"

const routes = Router()

routes.use('/task', taskRoutes)

export default routes