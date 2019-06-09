import { Request, Response } from "express"
import { getRepository } from "typeorm"
import {User} from '../entity/User'

export default class AuthController{
  static login = async (req:Request, res:Response)=>{

    let{email, auth} = req.body
    if (!(email && auth)) {
      res.status(400).send()
    }

    const userRepo = getRepository(User)

    let user: User
    try{
      user = await userRepo.findOneOrFail({where:{email}})
    } catch(error){
      res.status(401).send()
    }

    res.send(user)
  }

  static bing = async (req:Request, res:Response)=>{
    res.send({hi:'hello dear auth'})
  }
}