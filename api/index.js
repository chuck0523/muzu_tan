const rest = require('./rest')

module.exports = (app) => {
  app.use('/api/rest', rest)
}