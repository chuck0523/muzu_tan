const twitter = require('../../lib/twitter').getClient()
const { FollowLog } = require('../../models')

module.exports = () => {
  twitter.getAllFollowers()
    .then(({ users }) => users.find(user => !user.live_following))
    .then(user => {
      // There's no users to unfollow
      if(user === undefined) {
        return
      }
      return twitter.unfollow(user.id_str)
    })
    .then(result => FollowLog.saveUnfollow({ account:  `${result.name}(@${result.screen_name})`}))
    .catch(err => console.error('Failed to unfollow: ', err))
}
