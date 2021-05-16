import express from 'express'
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

//Pulls in the environment file
dotenv.config()

//if in development mode, pulls in a certificate file for https.
const devCert = (process.env.NODE_ENV !== 'production') ? {
  key: fs.readFileSync(path.resolve('./server.key')),
  cert: fs.readFileSync(path.resolve('./server.crt'))
} : {}

//Establishing connection to Database.
createConnection().then(async (connection) => {
  await connection.synchronize()

  //The odd bit of naming app and server comes from an socket tutorial.
  const app = express()
  //In dev mode, we run the server as https. In production we use nginx to proxy.
  const server = (process.env.NODE_ENV !== 'production') ?
    https.createServer(devCert, app) :
    http.createServer(app)

  //Body parser handles incoming json documents.
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  //Passport is our connection to OAuth with Google.
  app.use(passport.initialize())
  passportConfig()

  //Corse and session handles cookies and authentication.
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

  //Socket is part of the handshaking with google and the client.
  const io = socketio(server)
  app.set('io', io)

  //This loads in our routes for the API.
  app.use("/api/", routes)
  //Default route for any that aren't covered.
  app.get('*',
    (req, res) => res.status(200)
      .send({ message: `Welcome to API! We have no response for ${req}.` }))

  const port = 3000

  app.set('port', port)

  //Notes to let me know things are happening.
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running https - DEV mode on', port)

  } else {
    console.log('Running http - Production mode on', port)
  }

  server.listen(port)

}).catch((error) => console.log(error))

