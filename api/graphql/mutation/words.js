const path = require('path')
const Word = require(path.resolve('./models/word'))
const graphql = require('graphql')
const { WordId, WordName, WordMeaning, WordType } = require('../types')

module.exports = {
  createWord: {
    type: WordType,
    description: 'Create new word',
    args: Object.assign({}, WordName, WordMeaning),
    resolve: (_, { name, meaning }) => {
      return Word.count().exec()
        .then(count => count + 1)
        .then(_id => Word.create({ _id, name, meaning }))
        .catch(err => 'Faile to create word: ' + JSON.stringify(err))
    }
  }
}
