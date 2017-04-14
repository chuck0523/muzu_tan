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

const cronTime = '0 10 0-14 * * *'

const tweet = () => {
  const message = 'test'
  console.log(message)
  client.post('statuses/update', { status: message }, (error, tweet, response) => {
    if(error) {
      console.error('error', error)
    }
  })
}

new CronJob({
  cronTime,
  onTick: () => {
    tweet()
  },
  start: true,
})
