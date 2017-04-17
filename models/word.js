module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  // schema
  const WordSchema = new Schema({
    _id: Number,
    name: String,
    meaning: String,
  })

  const Word = mongoose.model('Word', WordSchema)

  // add custom methods
  Word.findRandom = () => {
    return Word.count().exec()
      .then(count => {
        const random = Math.floor(Math.random() * count)
        return Word.findOne().skip(random)
      })
      .catch(err => console.error('Failed to get random word.'))
  }

  return Word
}
