import express from 'express'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import bodyParser from 'body-parser'
import {User} from './entity/Account'

createConnection().then(async (connection)=>{
  await connection.synchronize()
  
  const app = express()
  app.use(bodyParser.json())
  
  app.get('/create', async(req,res)=>{
    let user = new User()
    user.email = 'j@ergdyne.com'
    user.password = 'this is a strange hash'
    return connection.manager
      .save(user)
      .then(user => res.status(201).send(user))
  })

  app.get('/all', async(req,res)=>{
    let userRepo = connection.getRepository(User)
    return userRepo.find().then(users => res.status(200).send(users))
  })

  app.get('*', 
    (req,res) => res.status(200)
      .send({message: `Welcome to API! We have no response for ${req}.`}))
  
  app.listen(3000)
}).catch((error)=> console.log(error))

