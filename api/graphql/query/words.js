const path = require('path')
const Word = require(path.resolve('./models/word'))
const graphql = require('graphql')
const { WordId, WordType } = require('../types')

module.exports = {
  words: {
    type: new graphql.GraphQLList(WordType),
    resolve: () => {
      return Word.findAll()
        .then(words => words)
    }
  },
  word: {
    type: WordType,
    args: WordId,
    resolve: (_, { _id }) => {
      return Word.findById(_id)
        .then(word => word)
    }
  }
}
