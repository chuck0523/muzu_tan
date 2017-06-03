const graphql = require('graphql')
const words = require('./words')

module.exports = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return Object.assign({}, words)
  }
})
