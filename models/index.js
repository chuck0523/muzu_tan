module.exports = (mongoose) => {
  const Schema = mongoose.Schema
  return {
    Word: mongoose.model('Word', new Schema(require('./word')))
  }
}
