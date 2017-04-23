const twitter = require('../lib/twitter').getClient()
const { Word } = require('../models')
const cron = require('../lib/cron')

const tweetTime = '0 0 9,12,18 * * *'

const tweet = () => {
  require('./question').yontaku()
    .then(twitter.tweet)
    .catch(error => console.error(`Failed to tweet: ${error}.`))
}

// set cron task
cron.createJob(tweetTime, tweet)
