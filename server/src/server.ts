import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import session from 'express-session'
import * as dotenv from "dotenv"
//Work around

dotenv.config()

createConnection().then(async (connection) => {
  await connection.synchronize()

  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cors({origin: process.env.CLIENT_ORIGIN, credentials: true}))
  app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'limbforge',
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    cookie: { 
      maxAge: 1000*60*60*24,
      secure: false //temporary before https
    } 
  }))

  app.use("/api/", routes) 

  app.get('*',
    (req, res) => res.status(200)
      .send({ message: `Welcome to API! We have no response for ${req}.` }))

  app.listen(3000)
}).catch((error) => console.log(error))

