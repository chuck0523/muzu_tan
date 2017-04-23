const twitter = require('../../lib/twitter').getClient()

module.exports = () => {
  require('./question').yontaku()
    .then(twitter.tweet)
    .catch(err => console.error('Failed to tweet: ', err))
}
