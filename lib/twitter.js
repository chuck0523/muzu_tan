const Twitter = require('twitter')

let twitter;

module.exports.initClient = ({ consumer_key, consumer_secret, access_token_key, access_token_secret }) => {
  twitter = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  })

  // add custom methods
  twitter.getTweet = (tweetTd) => twitter.get('statuses/show', { id: tweetTd })
  twitter.getAllFollowers = () => twitter.get('friends/list', {})
  twitter.searchRecentTweets = (condition, count = 100) => twitter.get('search/tweets', { q: condition, count, result_type: 'recent' })
  twitter.tweet = (tweet) => twitter.post('statuses/update', { status: tweet })
  twitter.tweetTo = (tweet, tweetId) => twitter.post('statuses/update', { status: tweet, in_reply_to_status_id: tweetId })
  twitter.follow = (userId) => twitter.post('friendships/create', { user_id: userId })
  twitter.unfollow = (userId) => twitter.post('friendships/destroy', { user_id: userId })

  twitter.userStream = twitter.stream('user')
  twitter.selfMentionStream = twitter.stream('statuses/filter', { track: '@muzu_tan' })

}

module.exports.getClient = () => twitter
