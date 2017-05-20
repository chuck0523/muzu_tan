const express = require('express')
const route = express.Router()
const words = require('./words')

route.use('/words', words)

module.exports = route