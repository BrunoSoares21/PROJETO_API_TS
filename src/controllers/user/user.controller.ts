import User from "../../models/user.entity"
import { Request, Response } from "express"
import bcrypt from "bcrypt"

export default class UserController{
    static async index(req: Request, res: Response){
        // lista de users
        const users = await User.find({
            select: {
                tasks: {
                    title: true,
                    completed: true
                }
            },
            relations: {
                tasks: true
            }
        })
        return res.json(users)
    }
    static async store(req: Request, res: Response){
        const {name, email, password, tasks} = req.body

        if(!name || !email || !password){
            return res.status(400).json({msg: "Todos os campos são obrigatórios"})
        }
        
        // const user = await User.create({name, email, password})
        const user = new User()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password, 12)
        user.tasks = tasks
        await user.save()

        return res.json(user)
    }

    static async login(req: Request, res: Response){
        const { email, password } = req.body

        const user = await User.findOneBy({email})
        if(!user){
            return res.status(401).json({msg: "Usuário incorreto!"})
        }
        const passwordUser = user?.password ?? ''

        const passwordMatch = bcrypt.compareSync(password, passwordUser)
        
        if(passwordMatch){
            return res.status(401).json({msg: 'Senha incorreta!'})
        }

        res.status(200).send('OK!')
    }
}