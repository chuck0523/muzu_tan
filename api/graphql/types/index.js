const graphql = require('graphql')

const WordId = {
  _id : {
    name: 'Id of word',
    type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
  }
}
const WordName = {
  name: {
    name: 'Name of word',
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
  }
}
const WordMeaning = {
  meaning: {
    name: 'Meaning of word',
    type: new graphql.GraphQLNonNull(graphql.GraphQLString),
  }
}
const WordType = new graphql.GraphQLObjectType({
  name: 'word',
  fields: () => {
    return Object.assign({}, WordId, WordName, WordMeaning)
  }
})

module.exports = {
  WordId, WordName, WordMeaning, WordType
}
