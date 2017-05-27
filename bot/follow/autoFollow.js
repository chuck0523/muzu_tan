const twitter = require('../../lib/twitter').getClient()
const { FollowLog } = require('../../models')
const { sample } = require('../../lib/util')

const AUTO_FOLLOW_KEYWORDS = ['TOEIC900', 'TOEIC高得点', '難しい英単語']

module.exports = () => {
  twitter.searchTweets(sample(AUTO_FOLLOW_KEYWORDS), 1)
    .then(({ statuses }) => {
      if(statuses[0].user.following) {
        return Promise.reject('Already following')
      }
      return Promise.all([
        twitter.follow(statuses[0].user.id_str),
        Promise.resolve(statuses[0].text)
      ])
    })
    .then(results => {
      FollowLog.saveSearchFollow({
        account: `${results[0].name}(@${results[0].screen_name})`,
        search_result: results[1],
      })
    })
    .catch(error => console.error('Failed to follow back: ', error))
}
