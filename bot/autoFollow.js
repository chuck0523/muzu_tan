const cron = require('../lib/cron')
const twitter = require('../lib/twitter').getClient()

const followTime = '0 45 9-19 * * *'

const autoFollow = () => {
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

cron.createJob(followTime, autoFollow)
