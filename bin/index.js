const app = require('../app')
const CronJob = require('cron').CronJob
const client = require('../lib/twitterClient')(app.get('options'))

// tweet
const tweetTime = '0 0 0-14 * * *'

const tweet = () => {
  const message = 'test'
  client.post('statuses/update', { status: message })
    .then(tweet => console.log(`${tweet} was successfully tweeted.`))
    .catch(error => console.error(`Failed to tweet ${tweet}.`))
}
new CronJob({
  cronTime: tweetTime,
  onTick: () => {
    tweet()
  },
  start: true,
})

// follow back
const userStream = client.stream('user')
userStream.on('follow', (data) => {
  client.post('friendships/create', { user_id: data.source.id_str })
    .then(res => console.log(`Successfully followed back: ${res.name}`))
    .catch(error => console.error(`Failed to folllow back: ${error}`))
})


// unfollow
const unfollowTime = '0 0 0-14 * * *'

const unfollow = () => {
  client.get('friends/list', {})
    .then(({ users }) => {
      const user = users.find(user => !user.live_following)
      if(user === undefined) {
        console.log('There\'s no users to unfollow')
        return
      }
      client.post('friendships/destroy', { user_id: user.id_str })
      console.log(`Successfully unfollow: ${user.name}`)
    })
    .catch(error => console.error(`Failed to unfolllow: ${error}`))
}
new CronJob({
  cronTime: unfollowTime,
  onTick: () => {
    unfollow()
  },
  start: true,
})
