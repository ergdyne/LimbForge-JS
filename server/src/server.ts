import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import routes from './routes'
import session from 'express-session'
import * as dotenv from "dotenv"
import https from 'https'
import http from 'http'
import passport from 'passport'
import socketio from 'socket.io'
import passportConfig from './functions/passportConfig'
//Work around

dotenv.config()

const devCert = (process.env.NODE_ENV !== 'production') ? {
  key: fs.readFileSync(path.resolve('./server.key')),
  cert: fs.readFileSync(path.resolve('./server.crt'))
} : {}

createConnection().then(async (connection) => {
  await connection.synchronize()

  const app = express()
  const server = (process.env.NODE_ENV !== 'production') ?
    https.createServer(devCert, app) :
    http.createServer(app)

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(passport.initialize())

  app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }))
  app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'limbforge',
    resave: true,
    saveUninitialized: true,
    unset: 'destroy',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false //temporary before https
    }
  }))
  passportConfig()
  const io = socketio(server)
  app.set('io', io)

  //Link socket id to session
  app.use((req, res, next)=>{
    req.session.socketId = req.query.socketId
    next()
  })

  app.use("/api/", routes)

  app.get('*',
    (req, res) => res.status(200)
      .send({ message: `Welcome to API! We have no response for ${req}.` }))

  const port = 3000

  app.set('port', port)

  //Temp
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running https - DEV mode')

  } else {
    console.log('Running http - Production mode')
  }

  server.listen(port)

}).catch((error) => console.log(error))

