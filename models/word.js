const mongoose = require('../lib/mongoose')
const { getRandomNumbers } = require('../lib/util')
const Schema = mongoose.Schema;

// schema
const WordSchema = new Schema({
  _id: Number,
  name: String,
  meaning: String,
})

const Word = mongoose.model('Word', WordSchema)

// add custom methods
Word.findAll = () => {
  return Word.find({})
    .catch(err => console.error('Failed to get all words', err))
}


Word.findRandom = () => {
  return Word.count().exec()
    .then(count => Math.floor(Math.random() * count))
    .then(random => Word.findOne().skip(random))
    .catch(err => console.error('Failed to get random word'))
}

Word.findRandoms = (size) => {
  return Word.count().exec()
    .then(max => getRandomNumbers({ max, size }))
    .then(nums => Promise.all(nums.map(num => Word.findOne().skip(num))))
    .catch(err => console.error(`Failed to get random words: ${err}`))
}

Word.findByName = (name) => {
  return Word.findOne({ name })
    .catch(err => console.error(`Failed to find word by name: ${err}`))
}

module.exports = Word
