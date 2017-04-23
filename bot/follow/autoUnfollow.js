const twitter = require('../../lib/twitter').getClient()

module.exports = () => {
  twitter.getAllFollowers()
    .then(({ users }) => users.find(user => !user.live_following))
    .then(user => {
      // There's no users to unfollow
      if(user === undefined) {
        return
      }
      twitter.unfollow(user.id_str)
      console.log(`Successfully unfollow: ${user.name}(@${user.screen_name})`)
    })
    .catch(err => console.error('Failed to unfolllow: ', err))
}
