const twitter = require('../lib/twitter').getClient()
const { Word } = require('../models')
const cron = require('../lib/cron')

const tweetTime = '0 0 0-14 * * *'

const tweet = () => {
  require('./question').yontaku()
    .then(twitter.tweet)
    .then(tweet => console.log(`${tweet} was successfully tweeted.`))
    .catch(error => console.error(`Failed to tweet: ${error}.`))
}

// set cron task
cron.createJob(tweetTime, tweet)
