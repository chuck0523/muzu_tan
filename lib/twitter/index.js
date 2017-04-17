const Twitter = require('twitter')

module.exports.initClient = ({ consumer_key, consumer_secret, access_token_key, access_token_secret }) => {
  const client = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  })

  // add custom methods
  client.tweet = (tweet) => client.post('statuses/update', { status: tweet })
  client.follow = (userId) => client.post('friendships/create', { user_id: userId })
  client.unfollow = (userId) => client.post('friendships/destroy', { user_id: userId })

  return client
}
