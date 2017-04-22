const cron = require('../lib/cron')
const twitter = require('../lib/twitter').getClient()

const unfollowTime = '0 30 0-14 * * *'

const unfollow = () => {
  twitter.getAllFollowers()
    .then(({ users }) => {
      const user = users.find(user => !user.live_following)
      // There's no users to unfollow
      if(user === undefined) {
        return
      }
      twitter.unfollow(user.id_str)
      console.log(`Successfully unfollow: ${user.name}`)
    })
    .catch(error => console.error(`Failed to unfolllow: ${error}`))
}

// set cron job
cron.createJob(unfollowTime, unfollow)
