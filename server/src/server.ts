import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import { User } from './entity/User'

createConnection().then(async (connection) => {
  await connection.synchronize()

  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())//TODO security is off

  app.use("/", routes)

  app.get('*',
    (req, res) => res.status(200)
      .send({ message: `Welcome to API! We have no response for ${req}.` }))

  app.listen(3000)
}).catch((error) => console.log(error))

