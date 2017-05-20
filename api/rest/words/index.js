const express = require('express')
const route = express.Router()
const path = require('path')
const Word = require(path.resolve('./models/word'))

route.get('/', (req, res) => {
  return Word.findAll()
    .then(words => res.status(200).json(words))
    .catch(err => res.status(500).json(err))
})
route.get('/:id', (req, res) => {
  return Word.findById(req.params.id)
    .then(word => res.status(200).json(word))
    .catch(err => res.status(500).json(err))
})

module.exports = route