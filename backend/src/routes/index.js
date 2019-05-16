import express from 'express'
var router = express.Router()

//Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

export default router
