import { Router } from "express"
import UserController from "../../controllers/user/user.controller"

const userRoutes = Router()

userRoutes.post('/', UserController.store)
userRoutes.get('/', UserController.index)
userRoutes.get('/login', UserController.login)

export default userRoutes
