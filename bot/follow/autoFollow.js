const twitter = require('../../lib/twitter').getClient()
const { FollowLog } = require('../../models')

module.exports = () => {
  twitter.searchTweets('TOEIC900', 1)
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
