const twitter = require('../../lib/twitter').getClient()

module.exports = () => {
  require('../lib/question').yontaku()
    .then(twitter.tweet)
    .catch(err => console.error('Failed to tweet: ', err))
}
