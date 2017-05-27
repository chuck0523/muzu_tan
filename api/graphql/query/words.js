const path = require('path')
const Word = require(path.resolve('./models/word'))
const graphql = require('graphql')

const WordType = new graphql.GraphQLObjectType({
  name: 'word',
  fields: () => {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      },
      meaning: {
        type: graphql.GraphQLString
      }
    }
  }
})
const IdType = {
  id : { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
}
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
    args: IdType,
    resolve: (_, { id }) => {
      return Word.findById(id)
        .then(word => word)
    }
  }
}
