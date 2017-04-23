const cron = require('../lib/cron')
const twitter = require('../lib/twitter').getClient()

const followTime = '0 45 0-10 * * *'

const autoFollow = () => {
  twitter.searchRecentTweets('英語勉強中', 1)
    .then(({ statuses }) => statuses[0].user.id_str)
    .then(twitter.follow)
    .then(res => console.log(`Successfully followed: ${res.name}`))
    .catch(error => console.error(`Failed to folllow back: ${error}`))
}

cron.createJob(followTime, autoFollow)
