import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import session from 'express-session'
import passport from 'passport'
import {passportConfig} from './operations/passportConfig'


const CLIENT_ORIGIN="http://localhost:8080" //TODO make https and move to env
const SESSION_SECRET="lalalala" //TODO move to env

createConnection().then(async (connection) => {
  await connection.synchronize()

  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(passport.initialize())
  passportConfig()
  app.use(cors({origin: CLIENT_ORIGIN,credentials: true}))
  app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  


  app.use("/", routes) 

  app.get('*',
    (req, res) => res.status(200)
      .send({ message: `Welcome to API! We have no response for ${req}.` }))

  app.listen(3000)
}).catch((error) => console.log(error))

