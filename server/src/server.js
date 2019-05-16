import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import http from 'http'


const app = express()
const server = http.createServer(app)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')))

app.get('*', 
  (req,res) => res.status(200)
    .send({message: `Welcome to API! We have no response for ${req}.`}))

const port = 3000//parseInt(process.env.PORT,10 || 3000)
app.set('port',port)


server.listen(port)
