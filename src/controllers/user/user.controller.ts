import User from "../../models/user.entity"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import Token from "../../models/token.entity"

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

        // Remove tokens anteriores
        await Token.delete({ userId: user?.id })

        const token = new Token()

        //res.status(200).send('OK!')

        const generatedToken = bcrypt.hashSync(`${user.id}${Date.now()}`, 8).slice(-31)
        const newToken =new Token()
        newToken.token = generatedToken
        newToken.userId = user.id
        newToken.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
        newToken.refreshToken = generatedToken

        await newToken.save()

        res.json(newToken)
    }
}