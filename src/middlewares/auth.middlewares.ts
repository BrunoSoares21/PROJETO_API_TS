import { Request, Response, NextFunction } from "express"
import Token from "../models/token.entity" 

export default async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers

    if(!authorization) return res.status(401).json({msg: 'Token inválido'})
    
    const userToken = await Token.findOneBy({token: authorization})
    
    if(!userToken) return res.status(401).json({msg: 'Token inválido'})
    
    // Verifica se o token expirou
    if(userToken.expiresAt < new Date()){
        userToken.remove()
        return res.status(401).json({msg: 'Token expirado'})
    }

    // Adiciona o id do usuário no header da requisição
    req.headers.userId = userToken.userId.toString()

    // Continua a execução
    next()
}