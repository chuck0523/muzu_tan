const Twitter = require('twitter')

module.exports = ({ consumer_key, consumer_secret, access_token_key, access_token_secret }) => {
  return new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  })
}
