const express = require('express')
const userRoutes = require('./userRoutes')
const blogRouter = require('./blogRoutes')

const router = express.Router()

router.use('/users',userRoutes)
router.use('/blog',blogRouter)

module.exports =  router;