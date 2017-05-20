const graphql = require('graphql')
const words = require('./words')

module.exports = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return Object.assign({}, words)
  }
})