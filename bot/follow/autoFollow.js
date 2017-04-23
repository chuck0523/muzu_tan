const twitter = require('../../lib/twitter').getClient()

module.exports = () => {
  twitter.searchRecentTweets('英語勉強中', 1)
    .then(({ statuses }) => {
      // already following
      if(statuses[0].user.following) {
        console.log('already following')
        return
      }
      return twitter.follow(statuses[0].user.id_str)
    })
    .then(res => console.log(`Successfully followed: ${statuses[0].user.name}(@${statuses[0].user.screen_name})`))
    .catch(error => console.error('Failed to folllow back: ', error))
}
