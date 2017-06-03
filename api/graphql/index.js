const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const query = require('./query')
const mutation = require('./mutation')

const Schema = new graphql.GraphQLSchema({
  query,
  mutation,
})

module.exports = graphqlHTTP({
  schema: Schema,
  graphiql: true,
  pretty: true,
})
