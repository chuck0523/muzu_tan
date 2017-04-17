const app = require('../app')
const cron = require('../lib/cron')
const client = require('../lib/twitter').initClient(app.get('options'))

const mongoose = require('../lib/mongo').connect(app.get('options'))
const { Word } = require('../models')(mongoose)

// tweet
const tweetTime = '0 0 0-14 * * *'

const tweet = () => {
  // still under development
  Word.findRandom()
  .then(word => {
    client.post('statuses/update', { status: `ランダム英単語【${word.name}】: ${word.meaning}` })
      .then(tweet => console.log(`${tweet} was successfully tweeted.`))
      .catch(error => console.error(`Failed to tweet ${tweet}.`))
  })
}
cron.createJob(tweetTime, tweet)

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
cron.createJob(unfollowTime, unfollow)
