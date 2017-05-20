const rest = require('./rest')
const graphql = require('./graphql')

module.exports = (app) => {
  app.use('/api/rest', rest)
  app.use('/api/graphql', graphql)
}