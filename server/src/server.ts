import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import session from 'express-session'

const CLIENT_ORIGIN="http://localhost:8080" //TODO make https and move to env
const SESSION_SECRET="lalalala" //TODO move to env

createConnection().then(async (connection) => {
  await connection.synchronize()

  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cors({origin: CLIENT_ORIGIN,credentials: true}))
  app.use(session({
    secret: SESSION_SECRET,
    name: 'limbforge',
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    cookie: { 
      maxAge: 1000*60*60*24,
      secure: false //temporary before https
    } 
  }))

  app.use("/", routes) 

  app.get('*',
    (req, res) => res.status(200)
      .send({ message: `Welcome to API! We have no response for ${req}.` }))

  app.listen(3000)
}).catch((error) => console.log(error))

