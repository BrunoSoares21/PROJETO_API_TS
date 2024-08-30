import User from "../../models/user.entity"
import { Request, Response } from "express"
import bcrypt from "bcrypt"

export default class UserController{
    static async index(req: Request, res: Response){
        // lista de users
        const users = await User.find({
            relations: {
                tasks: true
            }
        })
        return res.json(users)
    }
    static async store(req: Request, res: Response){
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({msg: "Todos os campos são obrigatórios"})
        }
        
        // const user = await User.create({name, email, password})
        const user = new User()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password, 12)
        await user.save()

        return res.json(user)
    }
}