const app = require('../app')
const Twitter = require('twitter')
const CronJob = require('cron').CronJob

const {
  consumer_key, consumer_secret, access_token_key, access_token_secret
} = app.get('options')

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
})

const cronTime = '0 0 0-14 * * *'

const tweet = () => {
  const message = 'test'
  client.post('statuses/update', { status: message })
    .then(tweet => console.log(`${tweet} was successfully tweeted.`))
    .catch(error => console.error(`Failed to tweet ${tweet}.`))
}

new CronJob({
  cronTime,
  onTick: () => {
    tweet()
  },
  start: true,
})
