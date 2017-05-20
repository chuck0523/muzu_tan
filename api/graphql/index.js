const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const query = require('./query')

const Schema = new graphql.GraphQLSchema({
  query
})

module.exports = graphqlHTTP({
  schema: Schema,
  graphiql: true,
  pretty: true,
})